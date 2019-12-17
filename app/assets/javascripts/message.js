$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="main__list__top">
                    <div class="main__list__top__name">
                      ${message.user_name}
                    </div>
                    <div class="main__list__top__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main__list__bottom">
                    <p class="main__list__bottom__message">
                      ${message.content}
                    </p>
                    <img src="${message.image}">
                  </div>`
    } else {
      var html = `<div class="main__list__top">
                    <div class="main__list__top__name">
                      ${message.user_name}
                    </div>
                    <div class="main__list__top__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main__list__bottom">
                    <div class="main__list__bottom__message">
                      ${message.content}
                    </div>
                  </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__list').append(html);
      $('.main__list').animate({ scrollTop: $('.main__list')[0].scrollHeight});
      $('#message_content').val('');
      $('#message_image').val('');
      $('.new_message__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});