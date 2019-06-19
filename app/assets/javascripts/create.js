$(function(){
  function buildHTML(message){
    var html = `<div class="right-contents__main__chat-display">
                  <span class="right-contents__main__chat-display__user">${message.user_name}</span>
                  <span class="right-contents__main__chat-display__post-date">${message.date}</span>
                  <div class="right-contents__main__chat-display__article">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${message.image.url === null ? `` : `<img class="lower-message__image" src="${message.image.url}" alt="${message.image}">`}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.right-contents__main').append(html);
      $('#new_message')[0].reset();
      $('.right-contents__main').animate({scrollTop: $('.right-contents__main')[0].scrollHeight});
      $('.right-contents__form__display__send-button').prop("disabled", false);
      })
    .fail(function(){
      alert('メッセージを入力してください。');
      $('.right-contents__form__display__send-button').prop("disabled", false);
    })
  })
});