$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__message-list">
          <div class="chat-main__message-list__name">
            <div class="chat-massage-name">
              ${message.user_name}
            </div>
            <div class="chat-massage-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__main">
            <p class="chat-message-main">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="chat-main__message-list">
          <div class="chat-main__message-list__name">
            <div class="chat-massage-name">
              ${message.user_name}
            </div>
            <div class="chat-massage-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__main">
            <p class="chat-message-main">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-lists').append(html);
      $('.chat-main__message-lists').animate({ scrollTop: $('.chat-main__message-lists')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  })
});
