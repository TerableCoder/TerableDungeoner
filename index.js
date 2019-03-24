module.exports = function TerableDungeoner(mod) {
	const command = mod.command || mod.require.command;
	let Baracos = true;
	
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
			if(Baracos) enterBaracosAceDungeon();
			else enterAkashaAceDungeon();
        	command.message(`Now entering ${Baracos ? "Baracos" : "Akasha"} Ace Dungeon.`);
			Baracos = !Baracos;
    	},
		b(){
			enterBaracosAceDungeon();
			command.message(`Now entering Baracos Ace Dungeon.`);
			Baracos = false;
		},
		a(){
			enterAkashaAceDungeon();
			command.message(`Now entering Akasha Ace Dungeon.`);
			Baracos = true;
		}
	});
	
	mod.hook('S_RETURN_TO_LOBBY', 'raw', () => {
		Baracos = true;
	});
};