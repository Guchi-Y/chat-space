class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def index
    @users = User.where(search_condition, blank_confirmation, current_user.id)
    
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def blank_confirmation
    params[:userName].length == 0 ? "" : "#{params[:userName]}%"
  end
  
  def search_condition
    params[:group_member] == nil ? "name LIKE(?) AND id != ?" : "#{get_group_member}"
  end

  def get_group_member
    search_strings = 'name LIKE(?) AND id != ?'

    params[:group_member].each do |user_id|
      search_strings = search_strings + " AND id != #{user_id}"
    end

    return search_strings
  end

end
