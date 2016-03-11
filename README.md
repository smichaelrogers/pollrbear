# Pollrbear
[Live](http://www.pollrbear.com) -  Polling web app

## Usage

Have postgres installed locally,

Clone this repository
```shell
% bundle install
% rake db create
% rake db migrate
```
Seed for all of the random polls

Run a server

## API

Looks something like this
```shell
% rake routes

POST   /api/session(.:format)             api/sessions#create {:format=>:json}
GET    /api/session(.:format)             api/sessions#show {:format=>:json}
DELETE /api/session(.:format)             api/sessions#destroy {:format=>:json}
GET    /api/users(.:format)               api/users#index {:format=>:json}
POST   /api/users(.:format)               api/users#create {:format=>:json}
GET    /api/users/:id(.:format)           api/users#show {:format=>:json}
GET    /api/polls(.:format)               api/polls#index {:format=>:json}
POST   /api/polls(.:format)               api/polls#create {:format=>:json}
GET    /api/polls/:id(.:format)           api/polls#show {:format=>:json}
DELETE /api/polls/:id(.:format)           api/polls#destroy {:format=>:json}
GET    /api/answers(.:format)             api/answers#index {:format=>:json}
POST   /api/answers(.:format)             api/answers#create {:format=>:json}
GET    /api/answers/:id(.:format)         api/answers#show {:format=>:json}
DELETE /api/answers/:id(.:format)         api/answers#destroy {:format=>:json}
GET    /api/responses(.:format)           api/responses#index {:format=>:json}
POST   /api/responses(.:format)           api/responses#create {:format=>:json}
GET    /api/responses/:id(.:format)       api/responses#show {:format=>:json}
GET    /api/polls/trending/:id(.:format)  api/polls#trending
GET    /auth/:provider/callback(.:format) api/sessions#omniauth
```
## Copyright

Copyright © 2015-2016 Scott Rogers – Released under MIT License
