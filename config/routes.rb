Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:index, :show, :create]
    resources :polls, only: [:index, :create, :show, :update, :destroy]
    resources :questions, only: [:index, :create, :show, :update, :destroy]
    resources :answers, only:  [:index, :create, :show, :update, :destroy]
    resources :responses, only:  [:index, :create, :show, :update, :destroy]
    resources :invites, only: [:create, :destroy]
  end
  root to: 'pages#root'

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

end
