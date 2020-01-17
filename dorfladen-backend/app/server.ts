import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as fs from "fs";
import { Product, CartItem, User } from "./types";

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true, // forces an uninitialized session to be stored
    cookie: {
        httpOnly: false,
    },
}));

let products: Array<Product> = new Array<Product>();
let cartItemToFind: CartItem;
let productToAdd: Product ;
let newCartArray = <CartItem[]>[];
let productToAddId: Number;
let user: User;

function loadProducts() {
    products = JSON.parse(fs.readFileSync(path.join(__dirname, '/assets/products/products.json'), 'utf8'));
}

/* Product Api */
app.get("/api/products", (req, res) => {
    loadProducts();
    res.json(products);
});

app.get("/api/product/:id", (req, res) => {
    loadProducts();
    res.json(products.filter(p => p.id == parseInt(req.params.id)).pop());
});

/* Shopping Cart Api */
app.get("/api/shopping-cart", (req, res) => {
    if (req.session.cart == undefined) {
        req.session.cart = <CartItem[]>[];
    }

    res.json(req.session.cart);
});

app.post("/api/shopping-cart", (req, res) => {
    if (req.session.cart == undefined) {
        req.session.cart = <CartItem[]>[];
    }

    productToAdd = <Product>req.body;

    cartItemToFind = req.session.cart.find(item => item.product.id == productToAdd.id);
    newCartArray = req.session.cart.filter(
        item => item.product.id != productToAdd.id);

    if (cartItemToFind != undefined) {
        cartItemToFind.amount += 1;
        req.session.cart = <CartItem[]>[
            ...newCartArray, cartItemToFind
        ];
    }
    else {
        req.session.cart = <CartItem[]>[
            ...newCartArray,
            { product: productToAdd, amount: 1 }
        ];
    }


    res.sendStatus(200);
});

app.post("/api/increase-shopping-cart", (req, res) => {    
      if (req.session.cart == undefined) {
        req.session.cart = <CartItem[]>[];
    }

    productToAdd = <Product>req.body;

    cartItemToFind = req.session.cart.find(item => item.product.id == productToAdd.id);
    newCartArray = req.session.cart.filter(
        item => item.product.id != productToAdd.id);

    if (cartItemToFind != undefined) {
        cartItemToFind.amount += 1;
    }
    else {
        req.session.cart = <CartItem[]>[
            ...newCartArray,
            { product: productToAdd, amount: 1 }
        ];
    }


    res.sendStatus(200);
});

app.post("/api/decrease-shopping-cart", (req, res) => {
      if (req.session.cart == undefined) {
        req.session.cart = <CartItem[]>[];
    }

    productToAdd = <Product>req.body;

    cartItemToFind = req.session.cart.find(item => item.product.id == productToAdd.id);
    newCartArray = req.session.cart.filter(
        item => item.product.id != productToAdd.id);

    if (cartItemToFind != undefined) {
        cartItemToFind.amount -= 1;
        if(cartItemToFind.amount == 0){
            req.session.cart = <CartItem[]>[
                ...newCartArray];
        }
    }



    res.sendStatus(200);
});

app.post("/api/submit", (req, res) => {
 this.user = <User>req.body;

 console.log(this.user);

 if(this.user.email != '' && this.user.nachname != '' && this.user.email != ''){
    req.session.cart = <CartItem[]>[];
    res.sendStatus(200);
 }
 else{
     res.sendStatus(403);
 }

  
});

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/spectre", express.static(path.join(__dirname, "..", "/node_modules/spectre.css/dist")));

app.listen(8080, () => console.log("server is listening"));
