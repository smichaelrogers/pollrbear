Rails.application.routes.draw do
  root to: 'pages#root'

  resources :users, only: [:new, :create, :edit, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, default: { format: :json } do

    # get 'responses/poll/:id' => 'responses#poll_responses'
    resources :polls
    resources :questions
    resources :graphs, only: [:create, :update, :destroy]
    resources :answers
    resources :responses, only: [:create, :update, :destroy]
  end
end
