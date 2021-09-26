const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");

const ZContainer = document.getElementById("z-input-container");
const Z0 = document.getElementById("Z0");

const P = document.getElementById("P");
const Q = document.getElementById("Q");
const R = document.getElementById("R");
const S = document.getElementById("S");

const input = [A, B, C, D];
const output = [P, Q, R, S];

const selectA = document.getElementById("select-A");
const selectB = document.getElementById("select-B");

const reset = () => {
   output.forEach((o) => {
      o.innerText = "-";
   });
};

const handleOnChange = (event) => {
   ZContainer.style.display = "none";

   if (event.target.id == "select-B") {
      reset();
   }

   if (
      (selectA.value === "s" && selectB.value === "abcd") ||
      (selectA.value == "abcd" && selectB.value == "s")
   ) {
      ZContainer.style.display = "inline";
   }
};

const convert = () => {
   console.log(`${selectA.value}to${selectB.value}`);
   if (
      selectA.value == "Select a Parameter" ||
      selectB.value == "Select a Parameter" ||
      selectA.value == selectB.value
   ) {
      Toastify({
         text: "Select Parameters",
         duration: 3000,
         destination: "https://github.com/apvarun/toastify-js",
         newWindow: true,
         close: true,
         gravity: "bottom", // `top` or `bottom`
         position: "center", // `left`, `center` or `right`
         backgroundColor: "red",
         stopOnFocus: true, // Prevents dismissing of toast on hover
         onClick: function () {}, // Callback after click
      }).showToast();
      return;
   }

   const [a, b, c, d] = input.map((x) => x.value);
   let [p, q, r, s] = [];

   switch (`${selectA.value}to${selectB.value}`) {
      case "ztoy":
      case "ytoz":
         p = d / (a * d - b * c);
         q = -b / (a * d - b * c);
         r = -c / (a * d - b * c);
         s = a / (a * d - b * c);
         break;

      case "ztoabcd":
      case "abcdtoz":
         p = a / c;
         q = (a * d - b * c) / c;
         r = 1 / c;
         s = d / c;
         break;

      case "ztoh":
      case "htoz":
         p = (a * d - b * c) / d;
         q = b / d;
         r = -c / d;
         s = 1 / d;
         break;

      case "ztog":
      case "gtoz":
         p = 1 / a;
         q = -b / a;
         r = c / a;
         s = (a * d - b * c) / a;
         break;

      case "ytoh":
         p = 1 / a;
         q = -b / a;
         r = c / a;
         s = (a * d - b * c) / a;
         break;

      case "htoy":
         p = 1 / a;
         q = -b / a;
         r = c / a;
         s = -(a * d - b * c) / a;
         break;

      case "ytog":
      case "gtoy":
         p = (a * d - b * c) / d;
         q = b / d;
         r = -c / d;
         s = 1 / d;
         break;

      case "ytoabcd":
         p = -d / c;
         q = -1 / c;
         r = -(a * d - b * c) / c;
         s = 1 / c;
         break;

      case "htog":
         p = d / (a * d - b * c);
         q = -c / (a * d - b * c);
         r = -b / (a * d - b * c);
         s = a / (a * d - b * c);
         break;

      case "gtoh":
         p = d / (a * d - b * c);
         q = c / (a * d - b * c);
         r = b / (a * d - b * c);
         s = a / (a * d - b * c);
         break;

      case "gtoabcd":
         p = 1 / c;
         q = d / c;
         r = a / c;
         s = (a * d - b * c) / c;
         break;

      case "abcdtoy":
         p = d / b;
         q = -(a * d - b * c) / b;
         r = -1 / b;
         s = a / b;
         break;

      case "abcdtoh":
         p = b / d;
         q = (a * d - b * c) / d;
         r = -1 / d;
         s = c / d;
         break;

      case "abcdtog":
         p = b / d;
         q = (a * d - b * c) / d;
         r = -1 / d;
         s = c / d;
         break;

      default:
         break;
   }
   console.log([p, q, r, s]);
   [p, q, r, s] = [p, q, r, s].map((x) => Math.round(1000 * x) / 1000);
   P.innerText = p;
   Q.innerText = q;
   R.innerText = r;
   S.innerText = s;
};
