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
