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
        	command.message(`Now entering ${Baracos ? "Baracos" : "Akasha"} Ace Dungeon.`);
			if(Baracos) enterBaracosAceDungeon();
			else enterAkashaAceDungeon();
			Baracos = !Baracos;
    	},
		b(){
			command.message(`Now entering Baracos Ace Dungeon.`);
			enterBaracosAceDungeon();
			Baracos = false;
		},
		a(){
			command.message(`Now entering Akasha Ace Dungeon.`);
			enterAkashaAceDungeon();
			Baracos = true;
		}
	});
	
	mod.hook('S_RETURN_TO_LOBBY', 'raw', () => {
		Baracos = true;
	});
};