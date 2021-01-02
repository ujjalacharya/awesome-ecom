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
    orders:[
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