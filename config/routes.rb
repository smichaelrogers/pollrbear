Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:index, :create, :show]
    resources :polls, only: [:index, :create, :show, :destroy]
    resources :answers, only: [:index, :create, :show, :destroy]
    resources :responses, only:  [:index, :create]
  end

  root to: 'pages#root'
  get '/api/polls/trending/:id', to: 'api/polls#trending'
  get '/api/responses/sms/:id', to: 'api/responses#sms'
  get '/auth/:provider/callback', to: 'api/sessions#omniauth'
end
