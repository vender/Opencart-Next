const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ['media', 'class'],
	theme: {
    	extend: {
    		colors: {
    			body: '#5A5A5A',
    			heading: '#212121',
    			input: '#1D1E1F',
    			black: '#000',
    			white: '#fff',
    			linen: '#FBF1E9',
    			linenSecondary: '#ECE7E3',
    			olive: '#3D9970',
    			maroon: '#B03060',
    			brown: '#C7844B',
    			placeholder: '#707070',
    			borderBottom: '#f7f7f7',
    			facebook: '#4267B2',
    			facebookHover: '#395fad',
    			google: '#4285F4',
    			googleHover: '#307bf9',
    			gray: {
    				'50': '#FBFBFB',
    				'100': '#F1F1F1',
    				'150': '#F4F4F4',
    				'200': '#F9F9F9',
    				'300': '#E6E6E6',
    				'350': '#E9ECEF',
    				'400': '#999999',
    				'500': '#D8D8D8',
    				'600': '#3A3A3A',
    				'700': '#292929',
    				'800': '#707070'
    			}
    		},
    		fontSize: {
    			'10px': '.625rem'
    		},
    		screens: {
    			sm: '480px',
    			lg: '1025px',
    			'2xl': '1500px',
    			'3xl': '1780px'
    		},
    		spacing: {
    			'430px': '430px',
    			'450px': '450px',
    			'500px': '500px',
    			'64vh': '64vh'
    		},
    		minHeight: {
    			'50px': '50px'
    		},
    		scale: {
    			'80': '0.8',
    			'85': '0.85',
    			'300': '3',
    			'400': '4'
    		},
    		animation: {
    			shine: 'shine 1s',
    			fadeIn: 'fadeIn .3s ease-in-out',
    			carousel: 'marquee 60s linear infinite',
    			blink: 'blink 1.4s both infinite'
    		},
    		keyframes: {
    			shine: {
    				'100%': {
    					left: '125%'
    				}
    			},
    			fadeIn: {
    				from: {
    					opacity: 0
    				},
    				to: {
    					opacity: 1
    				}
    			},
    			marquee: {
    				'0%': {
    					transform: 'translateX(0%)'
    				},
    				'100%': {
    					transform: 'translateX(-100%)'
    				}
    			},
    			blink: {
    				'0%': {
    					opacity: 0.2
    				},
    				'20%': {
    					opacity: 1
    				},
    				'100% ': {
    					opacity: 0.2
    				}
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	},
    	boxShadow: {
    		cart: '0 3px 6px rgba(0,0,0,0.12)',
    		product: '0 6px 12px rgba(0,0,0,.08)',
    		listProduct: '0 2px 4px rgba(0,0,0,.08)',
    		navigation: '0 3px 6px rgba(0, 0, 0, 0.16)',
    		navigationReverse: '0 -3px 6px rgba(0, 0, 0, 0.16)',
    		header: '0 2px 3px rgba(0, 0, 0, 0.08)',
    		subMenu: '1px 2px 3px rgba(0, 0, 0, 0.08)',
    		bottomNavigation: '0 -2px 3px rgba(0, 0, 0, 0.06)',
    		cookies: '0 -2px 3px rgba(0, 0, 0, 0.04)'
    	},
    	fontFamily: {
    		body: [
    			'var(--font-inter)'
    		],
    		satisfy: ["'Satisfy', cursive'"],
    		segoe: ["'Segoe UI', sans-serif'"]
    	}
    },
	future: {
		hoverOnlyWhenSupported: true
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-animated'),
		require('@tailwindcss/aspect-ratio'),
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'animation-delay': (value) => {
						return {
							'animation-delay': value
						};
					}
				},
				{
					values: theme('transitionDelay')
				}
			);
		}),
        require("tailwindcss-animate")
    ],
}
