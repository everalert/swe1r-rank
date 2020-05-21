export default {
	Id : {
		Game : 'm1mmex12',
		Level : {
			'z9843rwl' : { abbr:'tbtc', name:'The Boonta Training Course' },
			'rdn4759m' : { abbr:'mgs', name:'Mon Gazza Speedway' },
			'ldylxp93' : { abbr:'bwr', name:'Beedo’s Wild Ride' },
			'gdr6nedz' : { abbr:'ac', name:'Aquilaris Classic' },
			'nwl45o9v' : { abbr:'m100', name:'Malastare 100' },
			'ywexyl9l' : { abbr:'ven', name:'Vengeance' },
			'69ze5x91' : { abbr:'smr', name:'Spice Mine Run' },
			'r9gqljd2' : { abbr:'sc', name:'Sunken City' },
			'o9xrg39l' : { abbr:'hg', name:'Howler Gorge' },
			'495x2mdp' : { abbr:'dd', name:'Dug Derby' },
			'rdq48o9x' : { abbr:'sr', name:'Scrapper’s Run' },
			'5d7q1qwy' : { abbr:'zc', name:'Zugga Challenge' },
			'kwj4g0wg' : { abbr:'bc', name:'Baroo Coast' },
			'owo4jj96' : { abbr:'bb', name:'Bumpy’s Breakers' },
			'xd1lmz9o' : { abbr:'exe', name:'Executioner' },
			'ewp43ywn' : { abbr:'sl', name:'Sebulba’s Legacy' },
			'y9m46z95' : { abbr:'gvg', name:'Grabvine Gateway' },
			'5wk4xvd4' : { abbr:'amr', name:'Andobi Mountain Run' },
			'592ek796' : { abbr:'dr', name:'Dethro’s Revenge' },
			'29vn6qdv' : { abbr:'fmr', name:'Fire Mountain Rally' },
			'xd4g1qdm' : { abbr:'tbc', name:'The Boonta Classic' },
			'xd061mdq' : { abbr:'apc', name:'Ando Prime Centrum' },
			'rw651pd7' : { abbr:'aby', name:'Abyss' },
			'n93zx2w0' : { abbr:'gnt', name:'The Gauntlet' },
			'z984orwl' : { abbr:'inf', name:'Inferno' }
		},
		Category : {
			'824owmd5':'3L',
			'9d8wr6dn':'1L'
		},
		Skips : {
			Id : '2lgz978p',
			Value : {
				'81p7we17':false,
				'p125ev1x':true
			}
		},
		Upgrades : {
			Id : '789k49lw',
			Value : {
				'z194gjl4':false,
				'xqkrk919':true
			}
		}
	},
	Api : {
		Url : 'https://www.speedrun.com/api/v1/leaderboards/%GAM%/level/%LVL%/%CAT%?embed=players,variables,platforms',
		RateLimit: 100 //per minute
	},
	Score : {
		Max : 100,
		Scale : 1.5,
		ScaleMin : 1.35,
		ScaleMax : 2,
		Precision: 6

	},
	TableFields : {
		pts: 'points',
		time: 'time',
		ptsALL: 'points-total',
		pts3L: 'points-3lap',
		pts1L: 'points-1lap',
		timeALL: 'time-total',
		time3L: 'time-3lap',
		time1L: 'time-1lap',
		best3L: 'best-3lap',
		best1L: 'best-1lap',
	},
	Setting : {
		Format : {
			Time: 'm:ss.SSS',
			TotalTime: 'h:mm:ss',
			TotalTimeFull: 'h:mm:ss.SSS',
			Points: '0.000',
			TotalPoints: '0.0',
		},
		Fallback : {
			Time: '---',
			TotalTime: '---',
			Points: 0,
			TotalPoints: 0,
		},
		Tilt : {
			CtxPan : {
				perspective:1000,
				reverse:true,
				max:17.5,
				scale:1.025
			},
			TableItem : {
				perspective:1000,
				reverse:true,
				max:15,
				scale:1.015,
				axis:'x'
			}
		},
		Lap : [
			{ name:'Overall', key:'ALL' },
			{ name:'3-Lap', key:'3L' },
			{ name:'1-Lap', key:'1L' },
		],
		Developer : {
			CategoryMultiplierFormat : '0.000'
		}
	},
	Routes : {
		'PLAYERLIST':'/racers',
		'PLAYER':'/racer/:id',
		'TRACKLIST':'/tracks',
		'TRACK':'/track/:id',
		'ABOUT':'/about',
		'CHANGELOG':'/changelog',
		'RANKING':'/',
		'DEBUG':'/debug',
	},
	Sections : [
		{
			id:'RANKING',
			name:'Ranking',
			pages:[
				{ id:'ALL', name:'Overall' },
				{ id:'3L', name:'3-Lap' },
				{ id:'1L', name:'1-Lap' }
			]
		},
		{
			id:'TRACKLIST',
			name:'Tracks',
			pages:[
				{ id:'SELECT', name:'Select' },
				{ id:'SINGLE' }
			]
		},
		{
			id:'TRACK',
			name:'Tracks',
			pages:[
				{ id:'3L', name:'3-Lap' },
				{ id:'1L', name:'1-Lap' }
			]
		},
		{
			id:'PLAYER',
			name:'Players',
			pages:[
				{ id:'SELECT', name:'Select' },
				{ id:'SINGLE' }
			]
		},
		{
			id:'ABOUT',
			name:'About',
			pages:[
				{ id:'ALL', name:'Overall' }
			]
		},
	]
}