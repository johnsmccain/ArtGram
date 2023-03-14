import pic1 from "./images/0.png";
import pic2 from "./images/01.png";
import pic3 from "./images/02.png";
import pic4 from "./images/03.png";
import pic5 from "./images/04.png";
import pic6 from "./images/05.png";
import pic7 from "./images/06.png";
import pic8 from "./images/07.png";
import pic9 from "./images/08.png";
import pic10 from "./images/09.png";

export const User = {
    id:"user1",
    name: "John",
    image: pic1,
    email: "johns@gmail.com"
}

export const arts = [
    {
        name: "ba",
        image: pic1,
        desc: "One sweet image",
        likes: [
            {id:"user1"},
            {id:"user2"},
            {id:"user3"},
            {id:"user4"},
        ],
        user: "John",
        category: "culture"
    },
    {
        name: "ba",
        image: pic2,
        desc: "One sweet image",
        likes: [
            {id:"user1"},
            {id:"user2"},
            {id:"user3"},
            {id:"user4"},
        ],
        user: "Kingley",
        category: "nature"
    },
    {
        name: "ba",
        image: pic10,
        desc: "One sweet image",
        likes: [
            {id:"user1"},
            {id:"user2"},
            {id:"user3"},
            {id:"user4"},
        ],
        user: "John",
        category: "culture"
    },
    {
        name: "ba",
        image: pic3,
        desc: "One sweet image",
        likes: [
            {id:"user1"},
            {id:"user2"},
            {id:"user3"},
            {id:"user4"},
        ],
        user: "John",
        category: "culture"
    },
    {
        name: "ba",
        image: pic9,
        desc: "One sweet image",
        likes: [
            {id:"user1"},
            {id:"user2"},
            {id:"user3"},
            {id:"user4"},
        ],
        user: "John",
        category: "culture"
    },
    {
        name: "ba",
        image: pic4,
        desc: "One sweet image",
        likes: [],
        user: "Josh",
        category: "cars"
    },
    {
        name: "ba",
        image: pic5,
        desc: "One sweet image",
        likes: [],
        user: "Josh",
        category: "cars"
    },
    {
        name: "ba",
        image: pic6,
        desc: "One sweet image",
        likes: [],
        user: "Josh",
        category: "cars"
    },
    {
        name: "ba",
        image: pic7,
        desc: "One sweet image",
        likes: [],
        user: "Josh",
        category: "cars"
    },
    {
        name: "ba",
        image: pic8,
        desc: "One sweet image",
        likes: [],
        user: "Josh",
        category: "cars"
    },
]

export const categories = [
    {name: "nature"},
    {name: "cars"},
    {name: "tradition"},
    {name: "culture"},
    {name: "dress"},
]