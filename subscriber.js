// ./models/subscriber.js
"use strict";

/**
 * @TODO: Listing 14.3 (p. 206)
 * 스키마 정의
 */
const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({
        name: String,
        emaill: String,
        phone: Number,
        newsletter: Boolean
    });

// Subscriber 모델 생성
module.exports = mongoose.model(
    "Subscriber",
    subscriberSchema
)