import {inflateRaw} from 'pako';

describe("Severals test", () => {
  const compGraph =
  '7ZfBcpswEIafxsdkANnYPiZO6h6akzttepTRAkoF65FlA336SiAMCnbGnnHSmUwvtvZfLYhvdyUYkUVWLiXdpE/IQIwCj5Uj8jAKAt+bEv1nlKpRJoHfCInkzE7qhBX/A22kVXecwdaZqBCF4htXjDDPIVKORqXEwp0Wo3DvuqGJvaPXCauIChhM+8mZSht1Fkw7/SvwJG3v7IfzxpPRdrK98DalDIueRB5HZCERVTPKygUIA6/l0sR9OeE9LExCrs4JqGnc2LCtqtonBKYf2JooVYoJ5lQ8duq9xF3OwFzG01aqMqGHvh5CydVzb/zLTLmdWOuhtBG1UbVGrmT13Dd6UcbswmqrjXsBpSpbH3SnUEvdar8hbuw6tkri70OuxkZpwRv3kFpLBHcyskh0xAZuEkljmlNbdFQmoPpugXtofIZg71oW/xIwA/0EeoIEQRXfuyVFbWUmh3ld8vTA5q82cf1iajvwBF2DaMKW/dWlEuJGLoriNkFMBNzGsnG2BTB4KrdOeiXRJdwgK1KuYLWhNZ1Ct7lbBDEXYoECZR1L4hjCKDokoudh0/na885OyB6kgvJNroddpomoXLPo+tVvmzDt9WroXZwIbdpcvNVjwf8eO7fHuiYaNlhWJuZM+aAeG+Ty9QL3VOzs1Y24HSRZSU7zpM7mZS0DPpvA9FjLzMMpoeE7tMyxJgmP9Mjs8h45AdLJZo+lfXMYtowQ+oy/HKZGOWPjYzBnwZqE7wGTjM/cca5BU69JuUdTD+ZT9V27tTYid/rXGD+oGFaqmeRAdGHlmMMrslaigie5NiNNC7R+byhx/bp0Zx0ZZ+xkC7ib3BXIz52Nf3JmGoJrpaHe7v1BFmwOhsfAp+HuT9wjNxiSH787+OAUePJ5wR+2kH8E/tQubsmPPy958or8kc3mSuS12X0V1r7etzV5/As=';

  test("Buffer and atob must give the same result", () => {
    let data = compGraph;
    expect(window.atob(data)).toEqual(Buffer.from(data, 'base64').toString('binary'))
  });

  test("Pako.inflateRaw after atob method (deprecated)", () => {
    let inflated = window.atob(compGraph);
    expect(inflateRaw(
      Uint8Array.from(inflated, (c) => c.charCodeAt(0)),
      { to: 'string' }
    )).not.toBeNaN()
  });

  test("Pako.inflateRaw after Buffer method", () => {
    // must'nt generate exception
    let inflated = Buffer.from(compGraph, 'base64').toString('binary')
    expect(inflateRaw(
      Uint8Array.from(inflated, (c) => c.charCodeAt(0)),
      { to: 'string' }
    )).not.toBeNaN()
  });

});
