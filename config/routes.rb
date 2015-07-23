Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:index, :create, :show, :update, :destroy]
    resources :polls, only: [:index, :create, :show, :update, :destroy]
    resources :questions, only: [:index, :create, :show, :update, :destroy]
    resources :answers, only: [:index, :create, :show, :update, :destroy]
    resources :responses, only:  [:index, :create, :show, :update, :destroy]
    resources :invites, only: [:index, :create, :show, :update, :destroy]
  end

  root to: 'pages#root'
  get '/api/polls/info/:id', to: 'api/polls#info'
  get '/api/polls/reports/:id', to: 'api/polls#report'
  get '/auth/:provider/callback', to: 'api/sessions#omniauth'
end
