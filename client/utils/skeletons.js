export const productDetailSkeleton = {
    category: [{
        brands: [''],
        slug: '',
        _id: 1,
        systemName: '',
        displayName: '',
        parent: {
            brands: [''],
            slug: '',
            _id: "1",
            systemName: '',
            displayName: '',
        }
    }],
    images: [{
        _id: "1",
        thumbnail: '/images/default-image.png',
        medium: '/images/default-image.png',
        large: '/images/default-image.png',
    }],
    size: [''],
    color: [''],
    weight: [''],
    tags: [''],
    discountRate: '',
    isVerified: '',
    isFeatured: '',
    viewsCount: '',
    noOfSoldOut: '',
    slug: '',
    remark: [''],
    _id: '1',
    model: '',
    description: '',
    name: '',
    brand: {
        slug: '',
        _id: 1,
        systemName: '',
        displayName: ''
    },
    warranty: '',
    return: '',
    quantity: '',
    soldBy: {
        holidayMode: {
            end: '',
            start: ''
        },
        _id: "1",
        address: '',
        shopName: ''
    },
    updatedAt: '',
    highlights: '',
    totalRatingUsers: '',
    averageRating: {
        $numberDecimal: ""
    },
    price: {
        $numberDecimal: ''
    },
    stars: {
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStars: 0,
        averageStar: 0,
        totalRatingUsers: 0
    },
    hasOnCart: null,
    hasBought: null,
    hasOnWishlist: null,
    hasReviewed: null,
    videoURL: [''],
}

export const singleProductCardSkeleton = {
    category: [
        {
            displayName: "",
            slug: "",
        },
    ],
    images: [
        {
            large: "",
            medium: "",
            thumbnail: "",
        },
    ],
    name: "",
    price: "",
}

export const mutliProductCardSekelton = {
    products: [
        {
            category: [
                {
                    displayName: "",
                    slug: "",
                },
            ],
            images: [
                {
                    large: "",
                    medium: "",
                    thumbnail: "",
                },
            ],
            name: "",
            price: "",
        },
        {
            category: [
                {
                    displayName: "",
                    slug: "",
                },
            ],
            images: [
                {
                    large: "",
                    medium: "",
                    thumbnail: "",
                },
            ],
            name: "",
            price: "",
        }, {
            category: [
                {
                    displayName: "",
                    slug: "",
                },
            ],
            images: [
                {
                    large: "",
                    medium: "",
                    thumbnail: "",
                },
            ],
            name: "",
            price: "",
        }, {
            category: [
                {
                    displayName: "",
                    slug: "",
                },
            ],
            images: [
                {
                    large: "",
                    medium: "",
                    thumbnail: "",
                },
            ],
            name: "",
            price: "",
        }
    ],
    totalCount: 4
}

export const SearchFilterSkeleton = {
    sizes: [],
    brands: [],
    warranties: [],
    colors: [],
    weights: [],
    prices: [
        null,
        100
    ],
    ratings: [
        5,
        4,
        3,
        2,
        1
    ]
}

export const userDataSkeleton = {
    email: "",
    phone: ""
};

export const activeLocSkeleton = {
    address: "",
};

export const myOrdersSkeleton = {
    orders: [
        {
            _id: '1',
            status: {
                dispatchedDetail: {
                    dispatchedDate: null
                },
                cancelledDetail: {
                    cancelledDate: "",
                    cancelledBy: "",
                    remark: ""
                },
                returnedDetail: {
                    returnedDate: null,
                    remark: []
                },
                activeDate: '',
                approvedDate: null,
                completedDate: null,
                tobereturnedDate: null,
                currentStatus: ''
            },
            isPaid: false,
            shipto: {
                region: "",
                city: "",
                area: "",
                address: "",
                phoneno: "",
                geolocation: {
                    coordinates: [
                        ""
                    ],
                    _id: "",
                    type: ""
                }
            },
            orderID: "",
            user: "",
            product: {
                _id: "",
                images: [
                    {
                        _id: "",
                        thumbnail: "",
                        medium: "",
                        large: "",
                        createdAt: "",
                        updatedAt: "",
                        __v: 0
                    }
                ],
                slug: "",
                name: "",
                price: {
                    $numberDecimal: ""
                }
            },
            soldBy: {
                _id: "",
                shopName: ""
            },
            quantity: "",
            payment: "",
            createdAt: "",
            updatedAt: "",
        }
    ],
    totalCount: 1
}

export const myReviewsSkeleton = [
    {
        _id: '1',
        star: '',
        user: '',
        product: {
            _id: '1',
            images: [
                {
                    _id: '1',
                    thumbnail: '/images/default-image.png',
                    medium: '/images/default-image.png',
                    large: '/images/default-image.png',
                    createdAt: '',
                    updatedAt: '',
                }
            ],
            slug: '',
            name: '',
            soldBy: {
                _id: '1',
                shopName: ''
            }
        },
        createdAt: '',
        updatedAt: '',
        comment: ''
    }
]

export const myWishlistSkeleton = {
    wishlists: [
        {
            _id: '1',
            isDeleted: null,
            user: '',
            product: {
                _id: '1',
                images: [
                    {
                        _id: '1',
                        thumbnail: '/images/default-image.png',
                        medium: '/images/default-image.png',
                        large: '/images/default-image.png',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                discountRate: '',
                slug: '',
                name: '',
                quantity: '',
                soldBy: {
                    _id: '1',
                    name: '',
                    address: '',
                    shopName: ''
                },
                price: {
                    $numberDecimal: ''
                }
            },
            createdAt: '',
            updatedAt: '',
            stars: {
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStars: 0,
                averageStar: 0,
                totalRatingUsers: 0
            },
            hasOnWishlist: null
        }
    ],
    totalCount: 1,
    totalAmount: 0
}

export const myCartsSkeleton = {
    carts: [
        {
            _id: '1',
            isDeleted: null,
            user: '',
            product: {
                _id: '1',
                images: [
                    {
                        _id: '1',
                        thumbnail: '/images/default-image.png',
                        medium: '/images/default-image.png',
                        large: '/images/default-image.png',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                discountRate: '',
                slug: '',
                name: '',
                quantity: '',
                soldBy: {
                    _id: '1',
                    name: '',
                    address: '',
                    shopName: ''
                },
                price: {
                    $numberDecimal: ''
                }
            },
            createdAt: '',
            updatedAt: '',
            stars: {
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStars: 0,
                averageStar: 0,
                totalRatingUsers: 0
            },
            hasOnWishlist: null
        },
        {
            _id: '1',
            isDeleted: null,
            user: '',
            product: {
                _id: '1',
                images: [
                    {
                        _id: '1',
                        thumbnail: '/images/default-image.png',
                        medium: '/images/default-image.png',
                        large: '/images/default-image.png',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                discountRate: '',
                slug: '',
                name: '',
                quantity: '',
                soldBy: {
                    _id: '1',
                    name: '',
                    address: '',
                    shopName: ''
                },
                price: {
                    $numberDecimal: ''
                }
            },
            createdAt: '',
            updatedAt: '',
            stars: {
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStars: 0,
                averageStar: 0,
                totalRatingUsers: 0
            },
            hasOnWishlist: null
        },
        {
            _id: '1',
            isDeleted: null,
            user: '',
            product: {
                _id: '1',
                images: [
                    {
                        _id: '1',
                        thumbnail: '/images/default-image.png',
                        medium: '/images/default-image.png',
                        large: '/images/default-image.png',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                discountRate: '',
                slug: '',
                name: '',
                quantity: '',
                soldBy: {
                    _id: '1',
                    name: '',
                    address: '',
                    shopName: ''
                },
                price: {
                    $numberDecimal: ''
                }
            },
            createdAt: '',
            updatedAt: '',
            stars: {
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStars: 0,
                averageStar: 0,
                totalRatingUsers: 0
            },
            hasOnWishlist: null
        },
        {
            _id: '1',
            isDeleted: null,
            user: '',
            product: {
                _id: '1',
                images: [
                    {
                        _id: '1',
                        thumbnail: '/images/default-image.png',
                        medium: '/images/default-image.png',
                        large: '/images/default-image.png',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                discountRate: '',
                slug: '',
                name: '',
                quantity: '',
                soldBy: {
                    _id: '1',
                    name: '',
                    address: '',
                    shopName: ''
                },
                price: {
                    $numberDecimal: ''
                }
            },
            createdAt: '',
            updatedAt: '',
            stars: {
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStars: 0,
                averageStar: 0,
                totalRatingUsers: 0
            },
            hasOnWishlist: null
        }
    ],
    totalCount: 1,
    totalAmount: 0
}