$(function() {

  var search_list     = $("#user-search-result");
  var current_user_id = $(".current_user_id").val();
  var chat_group_user = $("#chat-group-users");

  function appendUserName(userName, userId) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ userName }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ userId }" data-user-name="${ userName }">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  function appendChatMember(groupMemberName, groupMemberId) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ groupMemberId }'>
                  <p class='chat-group-user__name'>${ groupMemberName }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    chat_group_user.append(html);
  }

  $("#user-search-field").on('keyup', function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { userName: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      
      if (users.length == 0) {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
      
      users.forEach(function(user) {
        if (current_user_id == user.id) { return; }
        appendUserName(user.name, user.id);
      });
    })
    
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function() {
    var groupMemberName =  $(this).attr("data-user-name");
    var groupMemberId   =  $(this).attr("data-user-id");
    appendChatMember(groupMemberName, groupMemberId);
    $(this).parent().remove();
  });

  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function() {
    $(this).parent().remove();
  });

});