$(function () {

  class GaugeChartfrist {
    constructor(element, params) {
      this._element = element;
      this._initialValue = params.initialValue;
      this._higherValue = params.higherValue;
      this._title = params.title;
      this._subtitle = params.subtitle;
    }

    _buildConfig() {
      let element = this._element;

      return {
        value: this._initialValue,
        valueIndicator: {
          color: "#fff",
        },

        geometry: {
          startAngle: 180,
          endAngle: 360,
        },

        scale: {
          startValue: 0,
          endValue: this._higherValue,
          customTicks: [0, 25, 50, 75, 100],
          tick: {
            length: 8,
          },

          label: {
            font: {
              color: "#87959f",
              size: 9,
              family: '"Open Sans", sans-serif',
            },
          },
        },

        title: {
          verticalAlignment: "bottom",
          text: this._title,
          font: {
            family: '"Open Sans", sans-serif',
            color: "#fff",
            size: 15,
          },

          subtitle: {
            text: this._subtitle,
            font: {
              family: '"Open Sans", sans-serif',
              color: "#fff",
              weight: 5000,
              size: 16,
            },
          },
        },

        onInitialized: function () {
          let currentGauge = $(element);
          let circle = currentGauge.find(".dxg-spindle-hole").clone();
          let border = currentGauge.find(".dxg-spindle-border").clone();

          currentGauge.find(".dxg-title text").first().attr("y", 38);
          currentGauge.find(".dxg-title text").last().attr("y", 18);
          currentGauge.find(".dxg-value-indicator").append(border, circle);
        },
      };
    }

    init() {
      $(this._element).dxCircularGauge(this._buildConfig());
    }

  }

  class GaugeChart {
    constructor(element, params) {
      this._element = element;
      this._initialValue = params.initialValue;
      this._higherValue = params.higherValue;
      this._title = params.title;
      this._subtitle = params.subtitle;
    }

    _buildConfig() {
      let element = this._element;

      return {
        value: this._initialValue,
        valueIndicator: {
          color: "#fff",
        },

        geometry: {
          startAngle: 180,
          endAngle: 360,
        },

        scale: {
          startValue: 0,
          endValue: this._higherValue,
          customTicks: [0, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800],
          tick: {
            length: 8,
          },

          label: {
            font: {
              color: "#87959f",
              size: 9,
              family: '"Open Sans", sans-serif',
            },
          },
        },

        title: {
          verticalAlignment: "bottom",
          text: this._title,
          font: {
            family: '"Open Sans", sans-serif',
            color: "#fff",
            size: 15,
          },

          subtitle: {
            text: this._subtitle,
            font: {
              family: '"Open Sans", sans-serif',
              color: "#fff",
              weight: 5000,
              size: 16,
            },
          },
        },

        onInitialized: function () {
          let currentGauge = $(element);
          let circle = currentGauge.find(".dxg-spindle-hole").clone();
          let border = currentGauge.find(".dxg-spindle-border").clone();

          currentGauge.find(".dxg-title text").first().attr("y", 38);
          currentGauge.find(".dxg-title text").last().attr("y", 18);
          currentGauge.find(".dxg-value-indicator").append(border, circle);
        },
      };
    }

    init() {
      $(this._element).dxCircularGauge(this._buildConfig());
    }

  }

  $(document).ready(function () {
    $.ajax({
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQzYIf6ftuNUnH4elZi9xwbogvNXb6S1HG3xlno_YjIk2TSCQXJLYRUkDpxJUE0EhISQuSoC9-yHDtS/pub?output=csv",
      success: function (data) {


        var item = data.split("\n");
        console.log(item[item.length - 1]);
        let vlue = [
          Number(item[item.length - 1].split(",")[4]).toFixed(2),
          Number(item[item.length - 1].split(",")[2]).toFixed(2),
          Number(item[item.length - 1].split(",")[3]).toFixed(2),
          Number(item[item.length - 1].split(",")[5]).toFixed(0),
          Number(item[item.length - 1].split(",")[6]).toFixed(0),
        ];


        let name = [`Heat index (ºC)`, `Temperature (ºC)`, `Humidity (%)`, `PM 2.5 (µg/m³)`, `PM 10 (µg/m³)`];
        let unit = [``, ``, ``, ``, ``];


        $(".gauge").each(function (index, item) {
          let params = {
            initialValue: 0,
            higherValue: 100,
            title: `${name[index]}`,
            subtitle: `0 ${unit[index]}`,
          };

          let gauge = new GaugeChartfrist(item, params);
          gauge.init();

          gauge = $(item).dxCircularGauge("instance");
          let randomNum = vlue[index];
          let gaugeElement = $(gauge._$element[0]);

          gaugeElement
            .find(".dxg-title text")
            .last()
            .html(`${randomNum} ${unit[index]}`);
          gauge.value(randomNum);
        });

        $(".gauge1").each(function (index, item) {
          let params = {
            initialValue: 0,
            higherValue: 800,
            title: `${name[index + 3]}`,
            subtitle: `0 ${unit[index]}`,
          };

          let gauge = new GaugeChart(item, params);
          gauge.init();

          gauge = $(item).dxCircularGauge("instance");
          let randomNum = vlue[index + 3];
          let gaugeElement = $(gauge._$element[0]);

          gaugeElement
            .find(".dxg-title text")
            .last()
            .html(`${randomNum} ${unit[index + 3]}`);
          gauge.value(randomNum);
        });

      },
      error: function () {
        console.log("error");
      },
    });
  });
});

