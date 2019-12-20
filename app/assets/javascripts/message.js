$(function(){
  last_message_id = $('.main__list__box').last().attr('data-message-id');
  console.log(last_message_id);
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.content && message.image) {
      var html = `<div class="main__list__box" data-message-id="${message.id}">
                    <div class="main__list__box__top">
                      <div class="main__list__box__top__name">
                        ${message.user_name}
                      </div>
                      <div class="main__list__box__top__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main__list__box__bottom">
                      <p class="main__list__box__bottom__message">
                        ${message.content}
                      </p>
                      <img src="${message.image}">
                    </div>
                  </div>`
    } else if(message.content){
      var html = `<div class="main__list__box" data-message-id="${message.id}">
                    <div class="main__list__box__top">
                      <div class="main__list__box__top__name">
                        ${message.user_name}
                      </div>
                      <div class="main__list__box__top__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main__list__box__bottom">
                      <div class="main__list__box__bottom__message">
                        ${message.content}
                      </div>
                    </div>
                  </div>`
    } else if (message.image){
      var html = `<div class="main__list__box" data-message-id="${message.id}">
                    <div class="main__list__box__top">
                      <div class="main__list__box__top__name">
                        ${message.user_name}
                      </div>
                      <div class="main__list__box__top__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main__list__box__bottom">
                      <img src="${message.image}">
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
      $('.main__list').animate({scrollTop: $('.main__list')[0].scrollHeight});
      $('form')[0].reset();
      $('.new_message__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.main__list__box').last().data('message-id');
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(1);
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__list').append(insertHTML);
        $('.main__list').animate({scrollTop: $('.main__list')[0].scrollHeight});
      })
      .fail(function() {
        console.log('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});