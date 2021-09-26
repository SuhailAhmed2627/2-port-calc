class Complex {
   constructor(real, img) {
      this.real = real;
      this.img = img;
   }

   add(complexNo) {
      const ans = new Complex(
         this.real + complexNo.real,
         this.img + complexNo.img
      );
      data.push(ans);
      return ans;
   }

   subtract(complexNo) {
      const ans = new Complex(
         this.real - complexNo.real,
         this.img - complexNo.img
      );
      data.push(ans);
      return ans;
   }

   multiply(complexNo) {
      const ans = new Complex(
         this.real * complexNo.real - this.img * complexNo.img,
         this.real * complexNo.img + this.img * complexNo.real
      );
      data.push(ans);
      return ans;
   }

   divide(complexNo) {
      const ans = new Complex(
         (this.real * complexNo.real + this.img * complexNo.img) /
            (complexNo.img * complexNo.img + complexNo.real * complexNo.real),
         (this.img * complexNo.real - this.real * complexNo.img) /
            (complexNo.img * complexNo.img + complexNo.real * complexNo.real)
      );
      data.push(ans);
      return ans;
   }
}

const one = new Complex(1, 0);
const zero = new Complex(0, 0);

let data = [];

const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");

const Ac = document.getElementById("Ac");
const Bc = document.getElementById("Bc");
const Cc = document.getElementById("Cc");
const Dc = document.getElementById("Dc");

const ZContainer = document.getElementById("z-input-container");
const Z0 = document.getElementById("Z0");

const P = document.getElementById("P");
const Q = document.getElementById("Q");
const R = document.getElementById("R");
const S = document.getElementById("S");

const input = [A, B, C, D];
const output = [P, Q, R, S];
const inputC = [Ac, Bc, Cc, Dc];

let isComplexNumber = false;

const selectA = document.getElementById("select-A");
const selectB = document.getElementById("select-B");

const reset = () => {
   output.forEach((o) => {
      o.innerText = "-";
   });
};

const handleOnChange = (event) => {
   ZContainer.style.display = "none";

   if (event.target.id == "complex-switch") {
      isComplexNumber = !isComplexNumber;
      const complexElements = document.getElementsByClassName("complex");
      [...complexElements].forEach((element, index) => {
         if (index == 1 || index == 5) {
            element.style.marginRight = "15px";
         }
         element.style.display = isComplexNumber ? "flex" : "none";
      });
      const xRowElements = document.getElementsByClassName("xrow");
      [...xRowElements].forEach((element, index) => {
         if (index < 2) {
            element.style.gap = isComplexNumber ? "10px" : "30px";
         }
      });
      event.target.value = isComplexNumber ? "off" : "on";
      reset();
   }

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

   const [a, b, c, d] = input.map((x, index) => {
      if (isComplexNumber) {
         return new Complex(x.value, inputC[index].value);
      }
      return new Complex(x.value, 0);
   });
   let [p, q, r, s] = [];

   switch (`${selectA.value}to${selectB.value}`) {
      case "ztoy":
      case "ytoz":
         p = d.divide(a.multiply(d).subtract(b.multiply(c)));
         q = zero.subtract(b).divide(a.multiply(d).subtract(b.multiply(c)));
         r = zero.subtract(c).divide(a.multiply(d).subtract(b.multiply(c)));
         s = a.divide(a.multiply(d).subtract(b.multiply(c)));
         break;

      case "ztoabcd":
      case "abcdtoz":
         p = a.divide(c);
         q = a.multiply(d).subtract(b.multiply(c)).divide(c);
         r = one.divide(c);
         s = d.divide(c);
         break;

      case "ztoh":
      case "htoz":
         p = a.multiply(d).subtract(b.multiply(c)).divide(d);
         q = b.divide(d);
         r = zero.subtract(c).divide(d);
         s = one.divide(d);
         break;

      case "ztog":
      case "gtoz":
         p = one.divide(a);
         q = zero.subtract(b).divide(a);
         r = c.divide(a);
         s = a.multiply(d).subtract(b.multiply(c)).divide(d);
         break;

      case "ytoh":
         p = one.divide(a);
         q = zero.subtract(b).divide(a);
         r = c.divide(a);
         s = a.multiply(d).subtract(b.multiply(c)).divide(a);
         break;

      case "htoy":
         p = one.divide(a);
         q = zero.subtract(b).divide(a);
         r = c.divide(a);
         s = zero.subtract(a.multiply(d).subtract(b.multiply(c))).divide(a);
         break;

      case "ytog":
      case "gtoy":
         p = a.multiply(d).subtract(b.multiply(c)).divide(d);
         q = b.divide(d);
         r = zero.subtract(c).divide(d);
         s = one.divide(d);
         break;

      case "ytoabcd":
         p = zero.subtract(d).divide(c);
         q = zero.subtract(one).divide(c);
         r = zero.subtract(a.multiply(d).subtract(b.multiply(c))).divide(c);
         s = one.divide(c);
         break;

      case "htog":
         p = d.divide(a.multiply(d).subtract(b.multiply(c)));
         q = zero.subtract(c).divide(a.multiply(d).subtract(b.multiply(c)));
         r = zero.subtract(b).divide(a.multiply(d).subtract(b.multiply(c)));
         s = a.divide(a.multiply(d).subtract(b.multiply(c)));
         break;

      case "gtoh":
         p = d.divide(a.multiply(d).subtract(b.multiply(c)));
         q = c.divide(a.multiply(d).subtract(b.multiply(c)));
         r = b.divide(a.multiply(d).subtract(b.multiply(c)));
         s = a.divide(a.multiply(d).subtract(b.multiply(c)));
         break;

      case "gtoabcd":
         p = one.divide(c);
         q = d.divide(c);
         r = a.divide(c);
         s = a.multiply(d).subtract(b.multiply(c)).divide(c);
         break;

      case "abcdtoy":
         p = d.divide(b);
         q = zero.subtract(a.multiply(d).subtract(b.multiply(c))).divide(b);
         r = zero.subtract(one).divide(b);
         s = a.divide(b);
         break;

      case "abcdtoh":
         p = b.divide(d);
         q = a.multiply(d).subtract(b.multiply(c)).divide(d);
         r = zero.subtract(one).divide(d);
         s = c.divide(d);
         break;

      case "abcdtog":
         p = b.divide(d);
         q = a.multiply(d).subtract(b.multiply(c)).divide(d);
         r = zero.subtract(one).divide(d);
         s = c.divide(d);
         break;

      default:
         break;
   }
   console.log([p, q, r, s]);
   [p, q, r, s] = [p, q, r, s].map((x) => {
      if (isComplexNumber) {
         return `${Math.round(1000 * x.real) / 1000} ${
            x.img < 0 ? "-" : "+"
         } j${Math.abs(Math.round(1000 * x.img) / 1000)}`;
      }
      return Math.round(1000 * x.real) / 1000;
   });
   P.innerText = p;
   Q.innerText = q;
   R.innerText = r;
   S.innerText = s;

   data.forEach((x) => (x = null));
};
