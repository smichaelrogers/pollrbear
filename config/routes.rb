Rails.application.routes.draw do
  root to: 'pages#root'

  resources :users, only: [:new, :create, :edit, :show]
  resource :session, only: [:new, :create, :destroy]
  get 'sessions/current' => 'sessions#current'

  namespace :api, default: { format: :json } do
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
