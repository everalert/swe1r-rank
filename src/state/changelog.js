export default {
	0 : {
		1 : {
			Release : new Date('2020-04-21'),
			Notes : [
				"Initial release.",
				"Feature", [
					"Overall, 3-Lap and 1-Lap rankings.",
					"Added player profile pages.",
					"Added track-level ranking pages.",
					"Added switchable light/dark theme."
				],
				"Balance", [
					"Times ranked without categoric discrimination.",
					"Points assigned linearly on a 100-point scale for times up to 1.5× WR to 3 decimal places.",
				]
			]
		}
	},
	1 : {
		0 : {
			Release : new Date('2020-05-12'),
			Notes : [
				"Website moved to podracing.gg",
				"Feature", [
					"Added About page.",
					"Added Changelog.",
					"Added URL-linkable pages."
				],
			]
		},
		1 : {
			Release : new Date('2020-05-13'),
			Notes : [
				"Balance", [
					"Changed internal point precision from 3 to 6 decimal places."
				],
				"UI/UX", [
					"Changed lap setting to apply globally.",
					"Cosmetic changes to improve visibility."
				],
			]
		},
		2 : {
			Release : new Date('2020-05-16'),
			Notes : [
				"Feature", [
					"Added overall rankings.",
					"Added individual rankings for skips and upgrades combinations."
				]
			]
		},
		3 : {
			Release : new Date('2020-05-19'),
			Notes : [
				"Balance", [
					"Changed point scale to use sliding multiplier between 1.35× and 2.0× WR."
				]
			]
		},
		4 : {
			Release : new Date('2020-07-26'),
			Notes : [
				"Feature", [
					"Added category trophies to player profiles.",
					"Added ranking information to player timesheets."
				],
				"Design", [
					"New blue/gold color scheme",
					"Reworked overall design and design elements.",
					"Reworked highlights on Player profiles.",
					"Disabled light theme."
				],
				"UI/UX", [
					"Settings moved to dropdown menu.",
					"Category title visual clarity improved.",
					"Lap setting now skips Combined when on an individual track page.",
					"Individual track pages now show 3-Lap data when the lap setting is Combined."
				],
				"Other", [
					"Various performance improvements.",
					"Various bugfixes."
				]
			]
		},
		5 : {
			Release : new Date(),
			Notes : [
				"UI/UX", [
					"Mobile layout improvements."
				]
			]
		}
	},
};