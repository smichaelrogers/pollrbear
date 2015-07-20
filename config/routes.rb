Rails.application.routes.draw do
  root to: 'pages#root'

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

  namespace :api, default: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:index, :show, :create]
    resources :polls, only: [:index, :create, :show, :update, :destroy]
    resources :questions, only: [:index, :create, :show, :update, :destroy]
    resources :charts, only: [:create, :show, :update, :destroy]
    resources :answers, only:  [:index, :create, :show, :update, :destroy]
    resources :responses, only:  [:index, :create, :show, :update, :destroy]
    resources :comments, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
    resources :invites, only: [:create, :destroy]
    resources :users, only: [:create, :show, :update]
  end
end
