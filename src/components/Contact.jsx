import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, User, Building } from 'lucide-react';
import Layout from '../layout';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            propertyType: '',
            budget: '',
            message: '',
            preferredContact: 'email'
        }
    });

    const onSubmit = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Form submitted:', data);
        setIsSubmitted(true);
        reset();

        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            details: ['(555) 123-4567', '(555) 987-6543'],
            description: 'Call us anytime'
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['info@realestate.com', 'sales@realestate.com'],
            description: 'Send us a message'
        },
        {
            icon: MapPin,
            title: 'Office',
            details: ['123 Main Street', 'Downtown, NY 10001'],
            description: 'Visit our office'
        },
        {
            icon: Clock,
            title: 'Hours',
            details: ['Mon-Fri: 9AM-7PM', 'Sat-Sun: 10AM-5PM'],
            description: 'We\'re here to help'
        }
    ];

    return (
        <Layout>

            <div className="min-h-screen bg-gradient-to-br mt-10 from-emerald-50 to-emerald-100">
                {/* Success Message */}
                {isSubmitted && (
                    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Message sent successfully!</span>
                    </div>
                )}

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                        <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                            Ready to find your dream property? Our expert real estate team is here to help you every step of the way.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
                                <p className="text-gray-600 text-lg">
                                    We're here to assist you with all your real estate needs. Reach out through any of the following methods.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {contactInfo.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex items-center mb-4">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                                                    <IconComponent className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                {item.details.map((detail, idx) => (
                                                    <p key={idx} className="text-gray-700">{detail}</p>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gray-200 h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        {/* <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-500">Interactive Map Coming Soon</p> */}
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54066.383149171466!2d76.49947556922821!3d32.11927952974227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904b3e0d1e63ac9%3A0x11046afda32dfd59!2sPalampur%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1748259268572!5m2!1sen!2sin" width="600" height="260"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            {...register('name', {
                                                required: 'Name is required',
                                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                            })}
                                            type="text"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Email and Phone Row */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                type="email"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                {...register('phone', {
                                                    pattern: {
                                                        value: /^[\+]?[1-9][\d]{0,15}$/,
                                                        message: 'Invalid phone number'
                                                    }
                                                })}
                                                type="tel"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Property Type and Budget Row */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Type
                                        </label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <select
                                                {...register('propertyType')}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors appearance-none bg-white"
                                            >
                                                <option value="">Select property type</option>
                                                <option value="residential">Residential</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="land">Land</option>
                                                <option value="investment">Investment Property</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                            Budget Range
                                        </label>
                                        <select
                                            {...register('budget')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors appearance-none bg-white"
                                        >
                                            <option value="">Select budget range</option>
                                            <option value="under-200k">Under $200,000</option>
                                            <option value="200k-400k">$200,000 - $400,000</option>
                                            <option value="400k-600k">$400,000 - $600,000</option>
                                            <option value="600k-800k">$600,000 - $800,000</option>
                                            <option value="800k-1m">$800,000 - $1,000,000</option>
                                            <option value="over-1m">Over $1,000,000</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Preferred Contact Method */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Preferred Contact Method
                                    </label>
                                    <div className="flex space-x-6">
                                        <label className="flex items-center">
                                            <input
                                                {...register('preferredContact')}
                                                type="radio"
                                                value="email"
                                                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                            />
                                            <span className="ml-2 text-gray-700">Email</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                {...register('preferredContact')}
                                                type="radio"
                                                value="phone"
                                                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                            />
                                            <span className="ml-2 text-gray-700">Phone</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                {...register('preferredContact')}
                                                type="radio"
                                                value="both"
                                                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                            />
                                            <span className="ml-2 text-gray-700">Both</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: { value: 10, message: 'Message must be at least 10 characters' }
                                        })}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-vertical"
                                        placeholder="Tell us about your real estate needs, preferred locations, or any specific requirements..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-emerald-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}   