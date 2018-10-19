export function createChartForLoan (param) {

    let years = userInfo.duration;
    let labelsForChart = [];
    for(let i = 0; i <= years; i++) {
        labelsForChart.push(i);
    }

    let chart = new Chartist.Line('.ct-chart', {
        // A labels array that can contain any sort of values
        labels: labelsForChart,
        // Our series array that contains series objects or in this case series data arrays
        series: [
          param
        ]
      },
       {
        width: 450,
        height: 450,
        showPoint: true,
        lineSmooth: true,
        showArea: true,
        axisX: {
            labelInterpolationFnc: function (value) {
                return value + '-й год';
            }
        }
      })
      
      let seq = 0;

// Once the chart is fully created we reset the sequence
      chart.on('created', function() {
        seq = 0;
      });

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
      chart.on('draw', function(data) {
        if(data.type === 'point') {
    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
          data.element.animate({
            opacity: {
              // The delay when we like to start the animation
              begin: seq++ * 80,
              // Duration of the animation
              dur: 500,
              // The value where the animation should start
              from: 0,
              // The value where it should end
              to: 1
            },
            x1: {
              begin: seq++ * 80,
              dur: 500,
              from: data.x - 100,
              to: data.x,
              // You can specify an easing function name or use easing functions from Chartist.Svg.Easing directly
              easing: Chartist.Svg.Easing.easeOutQuart
            }
          });
      }
    });
}