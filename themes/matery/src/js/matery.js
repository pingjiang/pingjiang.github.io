"use strict";

$(function () {
  var CONFIG = window.CONFIG || {};

  function getConfig(key, def) {
    return key in CONFIG ? CONFIG[key] : def;
  }
  /**
   * 添加文章卡片hover效果.
   */
  var articleCardHover = function articleCardHover() {
    var animateClass = 'animated pulse';
    $('article .article').hover(function () {
      $(this).addClass(animateClass);
    }, function () {
      $(this).removeClass(animateClass);
    });
  };

  articleCardHover();
  /*菜单切换*/

  $('.sidenav').sidenav();
  /* 修复文章卡片 div 的宽度. */

  var fixPostCardWidth = function fixPostCardWidth(srcId, targetId) {
    var srcDiv = $('#' + srcId);

    if (srcDiv.length === 0) {
      return;
    }

    var w = srcDiv.width();

    if (w >= 450) {
      w = w + 21;
    } else if (w >= 350 && w < 450) {
      w = w + 18;
    } else if (w >= 300 && w < 350) {
      w = w + 16;
    } else {
      w = w + 14;
    }

    $('#' + targetId).width(w);
  };
  /**
   * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
   */


  var fixFooterPosition = function fixFooterPosition() {
    $('.content').css('min-height', window.innerHeight - 165);
  };
  /**
   * 修复样式.
   */


  var fixStyles = function fixStyles() {
    fixPostCardWidth('navContainer', 'articles');
    fixPostCardWidth('artDetail', 'prenext-posts');
    fixFooterPosition();
  };

  fixStyles();
  /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/

  $(window).resize(function () {
    fixStyles();
  });
  /*初始化瀑布流布局*/

  $('#articles').masonry({
    itemSelector: '.article'
  });
  AOS.init({
    easing: 'ease-in-out-sine',
    duration: 700,
    delay: 100
  });
  /*文章内容详情的一些初始化特性*/

  var articleInit = function articleInit() {
    $('#articleContent a').attr('target', '_blank');
    $('#articleContent img').each(function () {
      var imgPath = $(this).attr('src');
      $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>'); // 图片添加阴影

      $(this).addClass("img-shadow img-margin"); // 图片添加字幕

      var alt = $(this).attr('alt');
      var title = $(this).attr('title');
      var captionText = ""; // 如果alt为空，title来替

      if (alt === undefined || alt === "") {
        if (title !== undefined && title !== "") {
          captionText = title;
        }
      } else {
        captionText = alt;
      } // 字幕不空，添加之


      if (captionText !== "") {
        var captionDiv = document.createElement('div');
        captionDiv.className = 'caption';
        var captionEle = document.createElement('b');
        captionEle.className = 'center-caption';
        captionEle.innerText = captionText;
        captionDiv.appendChild(captionEle);
        this.insertAdjacentElement('afterend', captionDiv);
      }
    }); // $('#articleContent, #myGallery').lightGallery({
    //     selector: '.img-item',
    //     // 启用字幕
    //     subHtmlSelectorRelative: true
    // });
    // progress bar init
    // const progressElement = window.document.querySelector('.progress-bar');
    // if (progressElement) {
    //     new ScrollProgress((x, y) => {
    //         progressElement.style.width = y * 100 + '%';
    //     });
    // }
  };

  articleInit();
  $('.modal').modal();
  /*回到顶部*/

  $('#backTop').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    return false;
  });
  /*监听滚动条位置*/

  var $nav = $('#headNav');
  var $backTop = $('.top-scroll');
  $(window).scroll(function () {
    /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
    var scroll = $(window).scrollTop();

    if (scroll < 100) {
      $nav.addClass('nav-transparent');
      $backTop.slideUp(300);
    } else {
      $nav.removeClass('nav-transparent');
      $backTop.slideDown(300);
    }
  }); // search

  $('#btn-search').on('click', function() {
    searchFunc(getConfig('root', '') + "search.xml", 'searchInput', 'searchResult');
  });

  function initSlider(el, opts) {
    var coverSlider = $('.carousel');
    coverSlider.carousel({
        duration: Number(opts.duration),
        fullWidth: true,
        indicators: opts.showIndicators === 'true'
    });

    var carouselIntervalId;
    if (opts.autoLoop) {
        // Loop to call the next cover article picture.
        var autoCarousel = function() {
            carouselIntervalId = setInterval(function () {
                coverSlider.carousel('next');
            }, opts.intervalTime);
        };
        autoCarousel();
    }

    var restartPlay = function () {
        if (opts.autoLoop) {
        clearInterval(carouselIntervalId);
        autoCarousel();
        }
    };

    if (opts.showPrevNext) {
    // prev and next cover post.
        $('#prev-cover').click(function () {
            coverSlider.carousel('prev');
            restartPlay();
        });
        $('#next-cover').click(function () {
            coverSlider.carousel('next');
            restartPlay();
        });
    }
  }

  function initToc(opts) {
    tocbot.init({
      tocSelector: '#toc-content',
      contentSelector: '#articleContent',
      headingsOffset: -($(window).height() * 0.4 - 45),
      // headingsOffset: -205,
      headingSelector: opts.heading
    }); // modify the toc link href to support Chinese.

    var i = 0;
    var tocHeading = 'toc-heading-';
    $('#toc-content a').each(function () {
      $(this).attr('href', '#' + tocHeading + ++i);
    }); // modify the heading title id to support Chinese.

    i = 0;
    $('#articleContent').children(opts.heading).each(function () {
      $(this).attr('id', tocHeading + ++i);
    }); // Set scroll toc fixed.

    var tocHeight = parseInt($(window).height() * 0.4 - 64);
    var $tocWidget = $('.toc-widget');
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      /* add post toc fixed. */

      if (scroll > tocHeight) {
        $tocWidget.addClass('toc-fixed');
      } else {
        $tocWidget.removeClass('toc-fixed');
      }
    });

    if (opts.enable && opts.showToggleBtn) {
      /* 修复文章卡片 div 的宽度. */
      var fixPostCardWidth = function fixPostCardWidth(srcId, targetId) {
        var srcDiv = $('#' + srcId);

        if (srcDiv.length === 0) {
          return;
        }

        var w = srcDiv.width();

        if (w >= 450) {
          w = w + 21;
        } else if (w >= 350 && w < 450) {
          w = w + 18;
        } else if (w >= 300 && w < 350) {
          w = w + 16;
        } else {
          w = w + 14;
        }

        $('#' + targetId).width(w);
      }; // 切换TOC目录展开收缩的相关操作.


      var expandedClass = 'expanded';
      var $tocAside = $('#toc-aside');
      var $mainContent = $('#main-content');
      $('#floating-toc-btn .btn-floating').click(function () {
        if ($tocAside.hasClass(expandedClass)) {
          $tocAside.removeClass(expandedClass).slideUp(500);
          $mainContent.removeClass('l9');
        } else {
          $tocAside.addClass(expandedClass).slideDown(500);
          $mainContent.addClass('l9');
        }

        fixPostCardWidth('artDetail', 'prenext-posts');
      });
    }
  }

  if (window.PAGE_CONFIG_SLIDER) {
    initSlider('.carousel', window.PAGE_CONFIG_SLIDER);
  }

  if (window.PAGE_CONFIG_TOC) {
    initToc(window.PAGE_CONFIG_TOC);
  }

  $('.dynamic-cover').css('background-image', 'url(/medias/banner/' + new Date().getDay() + '.jpg)');
});

