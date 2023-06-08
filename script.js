function avgLastN(num, idx, arr) {
   let sum = 0;
   let counter = idx < num ? (idx + 1) : num;

   for (let i = 0; i < counter; i++)
      sum += array.stocks[idx - i].close;

   arr.push(sum / counter);
}

function newChart() {
   const myChart = new Chart(document.getElementById('myChart').getContext('2d'), {
      type: 'line',
      data: {
         labels: array.dates,
         datasets: [
            {
               label: 'Chiusura',
               data: array.prices,
               borderColor: 'rgb(0,126,0)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'line',
            },
            {
               label: 'Media 5gg',
               data: array.avgLast5,
               borderColor: 'rgba(255,0,255,.75)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 25 gg',
               data: array.avgLast25,
               borderColor: 'rgba(0,0,255,.75)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 50 gg',
               data: array.avgLast50,
               borderColor: 'rgba(160,128,96,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 75 gg',
               data: array.avgLast75,
               borderColor: 'rgba(128,160,96,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 100 gg',
               data: array.avgLast100,
               borderColor: 'rgba(160,96,128,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 150 gg',
               data: array.avgLast150,
               borderColor: 'rgba(128,96,160,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 200 gg',
               data: array.avgLast200,
               borderColor: 'rgba(96,160,128,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 250 gg',
               data: array.avgLast250,
               borderColor: 'rgba(96,128,160,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 300 gg',
               data: array.avgLast300,
               borderColor: 'rgba(128,128,128,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 350 gg',
               data: array.avgLast350,
               borderColor: 'rgba(96,96,96,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 400 gg',
               data: array.avgLast400,
               borderColor: 'rgba(64,64,64,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 500 gg',
               data: array.avgLast500,
               borderColor: 'rgba(0,32,32,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 750 gg',
               data: array.avgLast750,
               borderColor: 'rgba(32,0,32,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media 1000 gg',
               data: array.avgLast1000,
               borderColor: 'rgba(32,32,0,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
            {
               label: 'Media Totale',
               data: array.avgs,
               borderColor: 'rgba(0,0,0,1)',
               borderWidth: 1,
               fill: false,
               cubicInterpolationMode: 'monotone',
               tension: 0.4,
               pointStyle: 'dash'
            },
         ],
      }
   });
}

const stocks = { alphabet, amazon, amd, apple, cocacola, meta, microsoft, nvidia, pepsi, tesla };

for (stock in stocks) {
   document.querySelector('#stocks').innerHTML += '<option value="'+stock+'">'+stock+'</option>';
}

const periods = [5, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 500, 750, 1000];

for (i in periods) {
   document.querySelector('#period').innerHTML += '<option value="'+periods[i]+'">'+periods[i]+'</option>';
}

let array = {
   stocks: [], dates: [], prices: [], avgs: []
};

periods.forEach(el => array['avgLast' + el] = []);

document.querySelector('#stocks').addEventListener('change', function() {
   if (document.querySelector('#myChart'))
      document.querySelector('#myChart').remove();

   document.querySelector('#period').value = '';

   canvas = document.createElement('canvas');
   canvas.setAttribute('id', 'myChart');
   document.querySelector('#app').appendChild(canvas);

   for (let x in array) array[x] = [];

   array.stocks = stocks[this.value];

   let sumCloses = 0;

   array.stocks.forEach((el,i) => {
      array.dates.push(el.date);
      array.prices.push(el.close);

      sumCloses += el.close;
      array.avgs.push(sumCloses / (i + 1));

      periods.forEach(el => avgLastN(el, i, array['avgLast' + el]));
   });

   newChart();
});

document.querySelector('#period').addEventListener('change', function() {
   if (!document.querySelector('#myChart')) {
      this.value = '';
      return;
   }

   document.querySelector('#myChart').remove();

   canvas = document.createElement('canvas');
   canvas.setAttribute('id', 'myChart');
   document.querySelector('#app').appendChild(canvas);

   for (let x in array) array[x] = [];

   array.stocks = stocks[document.querySelector('#stocks').value];

   let sumCloses = 0;

   array.stocks.forEach((el,i) => {
      array.dates.push(el.date);
      array.prices.push(el.close);

      sumCloses += el.close;
      array.avgs.push(sumCloses / (i + 1));

      periods.forEach(el => avgLastN(el, i, array['avgLast' + el]));
   });

   if (this.value !== '') {
      for (x in array) {
         let arr = [];

         for (let i = 0; i < this.value; i++)
            arr.unshift(array[x][array[x].length - 1 - i]);

         array[x] = arr;
      }
   }

   newChart();
});