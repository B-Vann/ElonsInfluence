/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);


var chart_labels = ['2020-01-09', '2020-12-20', '2020-12-20', '2021-03-12', '2021-03-24', '2021-05-12', '2021-05-24', '2021-06-03', '2021-06-24'];
var temp_dataset = ['8045', '23500', '23500', '57102', '52503', '57010', '38043', '39004', '33002'];
var rain_dataset = ['8045', '23500', '23500', '57102', '52503', '57010', '38043', '39004', '33002'];
var ctx = document.getElementById("forecast").getContext('2d');
var config = {
    type: 'bar',
    data: {
        labels: chart_labels,
        datasets: [{
            type: 'line',
            label: "Price",
            fill: false,
            data: temp_dataset,
			borderColor: 'rgba(108, 136, 153, 0.65)'

        }, {
            type: 'scatter',
            label: "Elon tweeted",
            data: rain_dataset,
			backgroundColor: 'rgba(255, 61, 83, 1)',
			borderColor: 'rgba(255, 61, 83, 1)'
        }]
    },
    options: {
        scales: {
            yAxes: [{

            }, {

            }]
        }
    }
};
var forecast_chart = new Chart(ctx, config);
$("#button0").click(function() {
    var data = forecast_chart.config.data;
    data.datasets[0].data = temp_dataset;
    data.datasets[1].data = rain_dataset;
    data.labels = chart_labels;
    forecast_chart.update();
});
$("#button1").click(function() {
    var chart_labels = ['2019-01-01', '2019-03-01', '2019-06-01', '2020-01-01', '2020-03-01', '2020-06-01', '2021-01-01', '2021-06-01', '2021-08-01' ];
    var temp_dataset = ['154', '136', '250', '127', '227', '233', '730', '2700' , '2824'];
    var rain_dataset = ['154'];
    var data = forecast_chart.config.data;
    data.datasets[0].data = temp_dataset;
    data.datasets[1].data = rain_dataset;
    data.labels = chart_labels;
    forecast_chart.update();
});

$("#button2").click(function() {
    var chart_labels = ['2019-04-02','2019-04-02', '2020-12-20', '2021-02-04', '2021-02-04' , '2021-02-07', '2021-02-10', '2021-02-14' , '2021-02-21', '2021-03-01', '2021-03-05', '2021-03-13', '2021-04-01', '2021-04-14', '2021-05-09', '2021-05-11', '2021-05-13', '2021-05-20', '2021-05-24', '2021-07-01', '2021-07-01'];
    var temp_dataset = ['0.0034','0.0034', '0.0045', '0.037', '0.037', '0.079', '0.069', '0.062', '0.053', '0.051', '0.050', '0.055', '0.061', '0.12', '0.57', '0.49', '0.48', '0.39', '0.36', '0.24', '0.24'];
    var rain_dataset = ['0.0034','0.0034', '0.0045', '0.037', '0.037', '0.079', '0.069', '0.062', '0.053', '0.051', '0.050', '0.055', '0.061', '0.12', '0.57', '0.49', '0.48', '0.39', '0.36', '0.24', '0.24'];
    var data = forecast_chart.config.data;
    data.datasets[0].data = temp_dataset;
    data.datasets[1].data = rain_dataset;
    data.labels = chart_labels;
    forecast_chart.update();
});

