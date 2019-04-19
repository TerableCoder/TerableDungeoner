module.exports = function TerableDungeoner(mod) {
	const command = mod.command || mod.require.command;
	let whatDNG = 0;
	let disableLilith = true;
	
	function enterLilithAceDungeon(){
		mod.toServer('C_DUNGEON_WORK_ENTER', 1, {
			count: 2,
			unk1: 13,
			zone: 3016,
			random: 0,
			unk2: 13,
			unk3: 21,
			challenge1: 1,
			unk4: 21,
			challenge2: 2
		});
	}
	
	function enterBaracosAceDungeon(){
		mod.toServer('C_DUNGEON_WORK_ENTER', 1, {
			count: 2,
			unk1: 13,
			zone: 9032,
			random: 0,
			unk2: 13,
			unk3: 21,
			challenge1: 1,
			unk4: 21,
			challenge2: 2
		});
	}
	
	function enterAkashaAceDungeon(){
		mod.toServer('C_DUNGEON_WORK_ENTER', 1, {
			count: 2,
			unk1: 13,
			zone: 9031,
			random: 0,
			unk2: 13,
			unk3: 21,
			challenge1: 1,
			unk4: 21,
			challenge2: 2
		});
	}
	
	command.add(['terad', 'terabled', 'teraace', 'teraad'], {
		$default(){
				if(disableLilith){
					command.message(`Now entering ${whatDNG % 2 == 0 ? "Baracos" : "Akasha"} Ace Dungeon.`);
					if(whatDNG % 2 == 0) enterBaracosAceDungeon();
					if(whatDNG % 2 == 1) enterAkashaAceDungeon();
				} else{
					command.message(`Now entering ${whatDNG % 3 == 0 ? "Baracos" : whatDNG % 3 == 1 ? "Akasha" : "Lilith"} Ace Dungeon.`);
					if(whatDNG % 3 == 0) enterBaracosAceDungeon();
					if(whatDNG % 3 == 1) enterAkashaAceDungeon();
					if(whatDNG % 3 == 2) enterLilithAceDungeon();
				}
			whatDNG++;
    	},
		l(){
			command.message(`Now entering Lilith Ace Dungeon.`);
			enterLilithAceDungeon();
			whatDNG = 0;
		},
		b(){
			command.message(`Now entering Baracos Ace Dungeon.`);
			enterBaracosAceDungeon();
			whatDNG = 1;
		},
		a(){
			command.message(`Now entering Akasha Ace Dungeon.`);
			enterAkashaAceDungeon();
			whatDNG = 2;
		},
		dl(){
			disableLilith = !disableLilith;
			command.message(`Lilith ${!disableLilith ? "enabled" : "disabled"}.`);
		}
	});
	
	mod.hook('S_RETURN_TO_LOBBY', 'raw', () => {
		whatDNG = 0;
	});
};