import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'A red t-shirt, perfect for days with non-red weather.',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Can also be used for tea!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Pen & Paper',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    5.49
  ),
  new Product(
    'p7',
    'u3',
    'Lorem ipsum dolor sit amet',
    'https://1.bp.blogspot.com/-2l2vGj3L3L8/YMYjO56VOBI/AAAAAAAAAiM/iRCpPl_OQukgyYaNOqwiAXoDBFRSXZOawCLcBGAsYHQ/s16000/lorem%2Bipsum.jpg',
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet eu sapien non vulputate. Aliquam erat volutpat. Phasellus sagittis elit orci, a vestibulum nulla congue eu. Praesent ornare urna a nibh iaculis efficitur. Phasellus enim nulla, suscipit sit amet pellentesque efficitur, consequat ut dui. Vestibulum nec scelerisque nunc. Ut id consequat diam. Fusce condimentum magna rhoncus aliquet egestas. Nulla ut cursus erat. Curabitur et venenatis nibh",
    7500.99
  ),
  new Product(
    'p8',
    'u3',
    'Lorem ipsum dolor sit amet',
    'https://ursd.org/wp-content/uploads/2020/12/1.png',
    'Etiam orci lacus, porttitor nec mi ac, rhoncus pharetra felis. Mauris malesuada pharetra lorem nec ornare. Donec purus nunc, maximus nec nisi sit amet, ultricies porta purus. Donec vel neque ac erat pulvinar vestibulum. Morbi tristique libero venenatis ex fermentum pellentesque. Nullam cursus orci nec tortor tincidunt, eget ultrices orci imperdiet. Sed ac accumsan nibh. Duis efficitur lectus eros, eu pharetra justo lobortis vitae. Sed varius tellus non aliquam vulputate. Proin porta lacus enim. Phasellus ac ipsum odio.',
    1600.99
  ),
  new Product(
    'p9',
    'u1',
    'Lorem ipsum dolor sit amet',
    'https://www.webtekno.com/images/editor/default/0003/28/ea18cca4193e9d8342d722a9d80569f89a6885cb.jpeg',
    "Nullam porttitor ut diam eget iaculis. Duis cursus sapien et lacinia dignissim. Morbi blandit enim dictum pulvinar consequat. Etiam sollicitudin semper justo, in volutpat elit pretium a. Vestibulum ac bibendum neque. Integer fermentum neque pharetra venenatis bibendum. Praesent id ex eget quam rutrum fringilla. Suspendisse lacus ligula, dapibus quis porttitor id, imperdiet vitae tortor. Proin rhoncus risus id tortor molestie ultrices. Morbi finibus magna ac justo luctus, in aliquet nulla molestie. Integer posuere quam a nisi feugiat ornare. Morbi ultrices urna mauris, ac port",
    500.99
  )
];

export default PRODUCTS;
