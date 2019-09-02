import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let groups = JSON.parse(localStorage.getItem('groups')) || [];
let channels = JSON.parse(localStorage.getItem('channels')) || [];

if (users.find(x => x.username == 'super')){

}else{
    users.push({
        id: 0,
        username: 'super',
        password: 'super',
        email: 'super@admin.com',
        role: 'super',
        group: 'g0',
        token: 'fake-jwt-token'
    });
    // groups.push({
    //     id: 0,
    //     name: 'g0',
    //     token: 'fake-jwt-token',
    // });

    localStorage.setItem('users', JSON.stringify(users));
    // localStorage.setItem('groups', JSON.stringify(groups));
}
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();

                case url.endsWith('/channels/register') && method === 'POST':
                    return register3();
                case url.endsWith('/channels/authenticate') && method === 'POST':
                    return authenticate3();
                case url.endsWith('/channels') && method === 'GET':
                    return getChannels();
                case url.match(/\/channels\/\d+$/) && method === 'GET':
                    return getChannelById();
                case url.match(/\/channels\/\d+$/) && method === 'DELETE':
                    return deleteChannel();

                case url.endsWith('/groups/register') && method === 'POST':
                    return register2();
                case url.endsWith('/groups/authenticate') && method === 'POST':
                    return authenticate2();
                case url.endsWith('/groups') && method === 'GET':
                    return getGroups();
                case url.match(/\/groups\/\d+$/) && method === 'GET':
                    return getGroupById();
                case url.match(/\/groups\/\d+$/) && method === 'DELETE':
                    return deleteGroup();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }



        // route functions

        function register2() {
            const group = body
            console.log('12');
            console.log(groups);
            console.log(group.name);
            if (groups.find(x => x.name === group.name)) {
                console.log('has exist!');
                return error('Groupname "' + group.name + '" is already taken')
            }
            console.log('body');
            group.id = groups.length ? Math.max(...groups.map(x => x.id)) + 1 : 1;
            groups.push(group);
            console.log(group);
            localStorage.setItem('groups', JSON.stringify(groups));
            console.log('register ok');
            return ok();
        }

        function authenticate2() {
            const { name } = body;
            const group = groups.find(x => x.name === name);
            if (!group) return error('Groupname is incorrect');
            return ok({
                id: group.id,
                name: group.name,
                // username: user.username,
                // firstName: user.firstName,
                // lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getGroups() {
            if (!isLoggedIn()) return unauthorized();
            return ok(groups);
        }

        function getGroupById() {
            if (!isLoggedIn()) return unauthorized();

            const group = groups.find(x => x.id == idFromUrl());
            return ok(group);
        }

        function deleteGroup() {
            // if (!isLoggedIn()) return unauthorized();

            groups = groups.filter(x => x.id !== idFromUrl());
            localStorage.setItem('groups', JSON.stringify(groups));
            return ok();
        }


        function authenticate3() {
            const { name } = body;
            const channel = channels.find(x => x.name === name);
            if (!channel) return error('ChannelName is incorrect');
            return ok({
                id: channel.id,
                name: channel.name,
                group: channel.group,
                token: 'fake-jwt-token'
            })
        }
        function register3() {
            const channel = body

            if (channels.find(x => x.name === channel.name)) {
                return error('name "' + channel.name + '" is already taken')
            }

            channel.id = channels.length ? Math.max(...channels.map(x => x.id)) + 1 : 1;
            channels.push(channel);
            localStorage.setItem('channels', JSON.stringify(channels));

            return ok();
        }
        function getChannels() {
            if (!isLoggedIn()) return unauthorized();
            return ok(channels);
        }
        function getChannelById() {
            if (!isLoggedIn()) return unauthorized();

            const channel = channels.find(x => x.id == idFromUrl());
            return ok(channel);
        }
        function deleteChannel() {
            // if (!isLoggedIn()) return unauthorized();

            channels = channels.filter(x => x.id !== idFromUrl());
            localStorage.setItem('channels', JSON.stringify(channels));
            return ok();
        }


        // route functions

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }
        
        function authenticate() {
            console.log('after authenticate:', users);
            const { username, password } = body;
            console.log(body);
            const user = users.find(x => x.username === username && x.password === password);
            console.log(user);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password,
                role: user.role,
                group: user.group,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id == idFromUrl());
            return ok(user);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

