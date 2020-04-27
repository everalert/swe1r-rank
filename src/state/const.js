export default {
	Id : {
		Game : 'm1mmex12',
		Level : {
			'z9843rwl':'The Boonta Training Course',
			'rdn4759m':'Mon Gazza Speedway',
			'ldylxp93':'Beedo\'s Wild Ride',
			'gdr6nedz':'Aquilaris Classic',
			'nwl45o9v':'Malastare 100',
			'ywexyl9l':'Vengeance',
			'69ze5x91':'Spice Mine Run',
			'r9gqljd2':'Sunken City',
			'o9xrg39l':'Howler Gorge',
			'495x2mdp':'Dug Derby',
			'rdq48o9x':'Scrapper\'s Run',
			'5d7q1qwy':'Zugga Challenge',
			'kwj4g0wg':'Baroo Coast',
			'owo4jj96':'Bumpy\'s Breakers',
			'xd1lmz9o':'Executioner',
			'ewp43ywn':'Sebulba\'s Legacy',
			'y9m46z95':'Grabvine Gateway',
			'5wk4xvd4':'Andobi Mountain Run',
			'592ek796':'Dethro\'s Revenge',
			'29vn6qdv':'Fire Mountain Rally',
			'xd4g1qdm':'The Boonta Classic',
			'xd061mdq':'Ando Prime Centrum',
			'rw651pd7':'Abyss',
			'n93zx2w0':'The Gauntlet',
			'z984orwl':'Inferno'
		},
		Category : {
			'824owmd5':'3L',
			'9d8wr6dn':'1L'
		},
		Skips : {
			Id : '2lgz978p',
			Value : {
				'81p7we17':'No',
				'p125ev1x':'Yes'
			}
		},
		Upgrades : {
			Id : '789k49lw',
			Value : {
				'z194gjl4':'No',
				'xqkrk919':'Yes'
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
		Precision: 3

	},
	TableFields : {
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
		}
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