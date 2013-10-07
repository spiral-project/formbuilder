(function($) {
	
	$.fn.typer = function(options) {
			
		var defaults = {
			'speed' : 75,
			'delay' : 1500
		};

		var options = $.extend({}, defaults, options);
		
		return this.each(function() {

			var obj = $(this);
			obj.addClass('typerjs');

			var text = obj.text();
			text = text.split("");
			var count = text.length;
			
			var i = 0;

			obj.empty();
			
			obj.append('<span class="text"><span class="typer animate"></span></span>');

			var typeIt = function(){

				obj.find('.typer').removeClass('animate');

				var appendText = function(){
					if (i < count) {
						obj.find('.typer').before(text[i]);
						i++;
					} else if(!obj.find('.typer').hasClass('animate')) {
						obj.find('.typer').addClass('animate');
					}
				};

				setInterval(appendText, options.speed);

			};

			setTimeout(typeIt, options.delay);

		});
		
	};
	
})(jQuery);

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}