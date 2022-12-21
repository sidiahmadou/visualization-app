export const ChartOptions = {
    parsing: {
      xAxisKey: 'valuation',
      yAxisKey: 'price'
    },

    scales: {
        xAxis: {
            type: 'linear',
            ticks: {
                callback: function(value, index, ticks) {
                    const formatValue = value<1000000?value:Math.round(value/1000000)+'M'
                    return '$' + formatValue;
                },
            }
        },
        x:{
            title:{
                display:true,
                text: 'Exit Valuation',
                align:'start'
            }
        },
        y: {
            title:{
                display:true,
                text:'Price Per Share',
                align:'start'
            },
            ticks: {
                callback: function(value, index, ticks) {
                    return '$' + Math.round(value)
                },
            }
        }
    },

    plugins: {
        
        legend:{
            position:'bottom',
        },
        tooltip: {   
            callbacks: {
                label: function(){
                return ''
                },
                title:function(context){
                    return context[0].dataset.label
                },
                beforeLabel: function(context) {
                    const price = 'Price per Share : ' + new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw.price)
                    const valuation = 'Valuation : ' + new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw.valuation)
                    return [valuation, price];
                },
            }

        },
        zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              drag:{
                enabled:true
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          },
    }

}