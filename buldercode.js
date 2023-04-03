$( document ).ready(function() {
    // Переменные общие
    var nameAbilities = {
        str: { fullname:'Сила', shortname:'СИЛ' },
        dex: { fullname:'Ловкость', shortname:'ЛОВ' },
        con: { fullname:'Телосложение', shortname:'ТЕЛ' },
        int: { fullname:'Интеллект', shortname:'ИНТ' },
        wis: { fullname:'Мудрость', shortname:'МДР' },
        cha: { fullname:'Харизма', shortname:'ХАР' },
        all: { fullname:'Все', shortname:'ВСЕ' },
        free: { fullname:'Любой', shortname:'ЛЮБ' }
    }

    var arrSkills = {
        acrobatics:     { name: 'Акробатика',       attr: 'dex', description: '' },
        animal_handling:{ name: 'Уход за животными',attr: 'wis', description: '' },
        arcana:         { name: 'Магия',            attr: 'int', description: '' },
        athletics:      { name: 'Атлетика',         attr: 'str', description: '' },
        deception:      { name: 'Обман',            attr: 'cha', description: '' },
        history:        { name: 'История',          attr: 'int', description: '' },
        insight:        { name: 'Проницательность', attr: 'wis', description: '' },
        intimidation:   { name: 'Запугивание',      attr: 'cha', description: '' },
        investigation:  { name: 'Расследование',    attr: 'int', description: '' },
        medicine:       { name: 'Медицина',         attr: 'wis', description: '' },
        nature:         { name: 'Природа',          attr: 'int', description: '' },
        perception:     { name: 'Восприятие',       attr: 'wis', description: '' },
        performance:    { name: 'Выступление',      attr: 'cha', description: '' },
        persuasion:     { name: 'Убеждение',        attr: 'cha', description: '' },
        religion:       { name: 'Религия',          attr: 'int', description: '' },
        sleight_of_hand:{ name: 'Ловкость рук',     attr: 'dex', description: '' },
        stealth:        { name: 'Скрытность',       attr: 'dex', description: '' },
        survival:       { name: 'Выживание',        attr: 'wis', description: '' },
    }

    var arrRaces = {
        gnome:      { name: 'Гном',             description: '', book: 'PHB', variants: { forest_gnome: { name: 'Гном Лесной', book: 'PHB', modAttr: [{ type:'int', value: 2},{ type:'dex', value: 1}] }, rock_gnome: { name: 'Гном Скальный', book: 'PHB', modAttr: [{ type:'int', value: 2},{ type:'con', value: 1}] } } },
        dwarf:      { name: 'Дварф',            description: '', book: 'PHB', variants: { mountain_dwarf: { name: 'Дварф Горный', book: 'PHB', modAttr: [{ type:'con', value: 2},{ type:'str', value: 2}] }, hill_dwarf: { name: 'Дварф Холмовой', book: 'PHB', modAttr: [{ type:'con', value: 2},{ type:'wis', value: 1}] } } },
        dragonborn: { name: 'Драконорождённый', description: '', book: 'PHB', variants: { common_dragonborn: { name: 'Драконорождённый Обычный', book: 'PHB', modAttr: [{ type:'str', value: 2},{ type:'cha', value: 1}] } } },
        halforc:    { name: 'Полуорк',          description: '', book: 'PHB', variants: { common_halforc: { name: 'Полуорк Обычный', book: 'PHB', modAttr: [{ type:'str', value: 2},{ type:'con', value: 1}] } } },
        halfling:   { name: 'Полурослик',       description: '', book: 'PHB', variants: { stout_halfling: { name: 'Полурослик Коренастый', book: 'PHB', modAttr: [{ type:'dex', value: 2},{ type:'con', value: 1}] }, lightfoot_halfling: { name: 'Полурослик Легконогий', book: 'PHB', modAttr: [{ type:'dex', value: 2},{ type:'cha', value: 1}] } } },
        halfelf:    { name: 'Полуэльф',         description: '', book: 'PHB', variants: { common_halfelf: { name: 'Полуэльф Обычный', book: 'PHB', modAttr: [{ type:'cha', value: 2},{ type:'free', value: 1},{ type:'free', value: 1}] } } },
        tiefling:   { name: 'Тифлинг',          description: '', book: 'PHB', variants: { common_tiefling: { name: 'Тифлинг Обычный', book: 'PHB', modAttr: [{ type:'cha', value: 2},{ type:'int', value: 1}] } } },
        human:      { name: 'Человек',          description: '', book: 'PHB', variants: { common_human: { name: 'Человек Обычный', book: 'PHB', modAttr: [{ type:'all', value: 1}] }, variant_human: { name: 'Человек Альтернативный', book: 'PHB', modAttr: [{ type:'free', value: 1},{ type:'free', value: 1}] } } },
        elf:        { name: 'Эльф',             description: '', book: 'PHB', variants: { hight_elf: { name: 'Эльф Высший', book: 'PHB', modAttr: [{ type:'dex', value: 2},{ type:'int', value: 1}] }, wood_elf: { name: 'Эльф Лесной', book: 'PHB', modAttr: [{ type:'dex', value: 2},{ type:'wis', value: 1}] }, dark_elf: { name: 'Эльф Тёмный', book: 'PHB', modAttr: [{ type:'dex', value: 2},{ type:'cha', value: 1}] } } },
    };

    var arrBackgrounds = {
        entertainer:    { name: 'Артист',                   description: '', book: 'PHB', freeSkills: ['acrobatics','performance'] },
        urchin:         { name: 'Беспризорник',             description: '', book: 'PHB', freeSkills: ['sleight_of_hand','stealth'] },
        noble:          { name: 'Благородный',              description: '', book: 'PHB', freeSkills: ['history','persuasion'] },
        guild_artisan:  { name: 'Гильдейский ремесленник',  description: '', book: 'PHB', freeSkills: ['insight','persuasion'] },
        sailor:         { name: 'Моряк',                    description: '', book: 'PHB', freeSkills: ['athletics','perception'] },
        sage:           { name: 'Мудрец',                   description: '', book: 'PHB', freeSkills: ['history','arcana'] },
        folk_hero:      { name: 'Народный герой',           description: '', book: 'PHB', freeSkills: ['survival','animal_handling'] },
        hermit:         { name: 'Отшельник',                description: '', book: 'PHB', freeSkills: ['medicine','religion'] },
        pirate:         { name: 'Пират',                    description: '', book: 'PHB', freeSkills: ['athletics','perception'] },
        criminal:       { name: 'Преступник',               description: '', book: 'PHB', freeSkills: ['deception','stealth'] },
        acolyte:        { name: 'Прислужник',               description: '', book: 'PHB', freeSkills: ['insight','religion'] },
        soldier:        { name: 'Солдат',                   description: '', book: 'PHB', freeSkills: ['athletics','intimidation'] },
        outlander:      { name: 'Чужеземец',                description: '', book: 'PHB', freeSkills: ['athletics','survival'] },
        charlatan:      { name: 'Шарлатан',                 description: '', book: 'PHB', freeSkills: ['sleight_of_hand','deception'] }
    }

    var arrClasses = {
        bard:       { name: 'Бард',     description: '', book: 'PHB', freeSkills: [{ type:'free', value: 3}] },
        barbarian:  { name: 'Варвар',   description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['athletics','perception','survival','intimidation','nature','animal_handling']}] },
        fighter:    { name: 'Воин',     description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['acrobatics','athletics','perception','survival','intimidation','history','insight','animal_handling']}] },
        wizard:     { name: 'Волшебник',description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['history','arcana','medicine','insight','investigation','religion']}] },
        druid:      { name: 'Друид',    description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['perception','survival','arcana','medicine','animal_handling','nature','insight','religion']}] },
        cleric:     { name: 'Жрец',     description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['history','medicine','insight','religion','persuasion']}] },
        warlock:    { name: 'Колдун',   description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['intimidation','history','arcana','deception','nature','investigation','religion']}] },
        monk:       { name: 'Монах',    description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['acrobatics','athletics','history','insight','religion','stealth']}] },
        paladin:    { name: 'Паладин',  description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['athletics','intimidation','medicine','insight','religion','persuasion']}] },
        rogue:      { name: 'Плут',     description: '', book: 'PHB', freeSkills: [{ type:'var', value: 4, variants: ['acrobatics','athletics','perception','performance','intimidation','sleight_of_hand','deception','insight','investigation','stealth','persuasion']}] },
        ranger:     { name: 'Следопыт', description: '', book: 'PHB', freeSkills: [{ type:'var', value: 3, variants: ['athletics','perception','survival','nature','insight','investigation','stealth','animal_handling']}] },
        sorcerer:   { name: 'Чародей',  description: '', book: 'PHB', freeSkills: [{ type:'var', value: 2, variants: ['intimidation','arcana','deception','insight','religion','persuasion']}] }
    }

    var arrFeats = {
        actor: { name: 'Артистичный', url: '/feats/101-actor/', book: 'PHB', description: '', modAttr: [{ type:'cha', value: 1}] },
        athlete: { name: 'Атлетичный', url: '/feats/102-athlete/', book: 'PHB', description: '', modAttr: [{ type:'var', value: 1, variants: ['str','dex']}] },
        alert: { name: 'Бдительный', url: '/feats/103-alert/', book: 'PHB', description: '', modAttr: [] },
        war_caster: { name: 'Боевой заклинатель', url: '/feats/104-war_caster/', book: 'PHB', description: '', modAttr: [] },
        grappler: { name: 'Борец', url: '/feats/105-grappler/', book: 'PHB', description: '', modAttr: [] },
        lucky: { name: 'Везунчик', url: '/feats/106-lucky/', book: 'PHB', description: '', modAttr: [] },
        mounted_combatant: { name: 'Верховой боец', url: '/feats/107-mounted_combatant/', book: 'PHB', description: '', modAttr: [] },
        observant: { name: 'Внимательный', url: '/feats/108-observant/', book: 'PHB', description: '', modAttr: [{ type:'var', value: 1, variants: ['int','dex']}] },
        martial_adept: { name: 'Воинский адепт', url: '/feats/109-martial_adept/', book: 'PHB', description: '', modAttr: [] },
        inspiring_leader: { name: 'Воодушевляющий лидер', url: '/feats/110-inspiring_leader/', book: 'PHB', description: '', modAttr: [] },
        savage_attacker: { name: 'Дикий атакующий', url: '/feats/111-savage_attacker/', book: 'PHB', description: '', modAttr: [] },
        tavern_brawler: { name: 'Драчун', url: '/feats/112-tavern_brawler/', book: 'PHB', description: '', modAttr: [{ type:'var', value: 1, variants: ['str','dex']}] },
        lightly_armored: { name: 'Знаток лёгких доспехов', url: '/feats/113-lightly_armored/', book: 'PHB', description: '', modAttr: [{ type:'var', value: 1, variants: ['str','dex']}] },
        moderately_armored: { name: 'Знаток средних доспехов', url: '/feats/114-moderately_armored/', book: 'PHB', description: '', modAttr: [{ type:'var', value: 1, variants: ['str','dex']}] },
        heavily_armored: { name: 'Знаток тяжёлых доспехов', url: '/feats/115-heavily_armored/', book: 'PHB', description: '', modAttr: [{ type:'str', value: 1}] },
        dual_wielder: { name: 'Использование двух оружий', url: '/feats/116-dual_wielder/', book: 'PHB', description: '', modAttr: [] },
        dungeon_delver: { name: 'Исследователь подземелий', url: '/feats/117-dungeon_delver/', book: 'PHB', description: '', modAttr: [] },
        tough: { name: 'Крепкий', url: '/feats/118-tough/', book: 'PHB', description: '', modAttr: [] },
        healer: { name: 'Лекарь', url: '/feats/119-healer/', book: 'PHB', description: '', modAttr: [] },
        great_weapon_master: { name: 'Мастер большого оружия', url: '/feats/120-great_weapon_master/', book: 'PHB', description: '', modAttr: [] },
        polearm_master: { name: 'Мастер древкового оружия', url: '/feats/121-polearm_master/', book: 'PHB', description: '', modAttr: [] },
        weapon_master: { name: 'Мастер оружия', url: '/feats/122-weapon_master/', book: 'PHB', description: '', modAttr: [{ type:'var', value: 1, variants: ['str','dex']}] },
        medium_armor_master: { name: 'Мастер средних доспехов', url: '/feats/123-medium_armor_master/', book: 'PHB', description: '', modAttr: [] },
        heavy_armor_master: { name: 'Мастер тяжёлых доспехов', url: '/feats/124-heavy_armor_master/', book: 'PHB', description: '', modAttr: [{ type:'str', value: 1}] },
        shield_master: { name: 'Мастер щитов', url: '/feats/125-shield_master/', book: 'PHB', description: '', modAttr: [] },
        spell_sniper: { name: 'Меткие заклинания', url: '/feats/126-spell_sniper/', book: 'PHB', description: '', modAttr: [] },
        sharpshooter: { name: 'Меткий стрелок', url: '/feats/127-sharpshooter/', book: 'PHB', description: '', modAttr: [] },
        charger: { name: 'Налётчик', url: '/feats/128-charger/', book: 'PHB', description: '', modAttr: [] },
        defensive_duelist: { name: 'Оборонительный дуэлянт', url: '/feats/129-defensive_duelist/', book: 'PHB', description: '', modAttr: [] },
        skilled: { name: 'Одарённый', url: '/feats/130-skilled/', book: 'PHB', description: '', modAttr: [] },
        keen_mind: { name: 'Отличная память', url: '/feats/131-keen_mind/', book: 'PHB', description: '', modAttr: [{ type:'int', value: 1}] },
        mobile: { name: 'Подвижный', url: '/feats/132-mobile/', book: 'PHB', description: '', modAttr: [] },
        magic_initiate: { name: 'Посвящённый в магию', url: '/feats/133-magic_initiate/', book: 'PHB', description: '', modAttr: [] },
        skulker: { name: 'Проныра', url: '/feats/134-skulker/', book: 'PHB', description: '', modAttr: [] },
        ritual_caster: { name: 'Ритуальный заклинатель', url: '/feats/135-ritual_caster/', book: 'PHB', description: '', modAttr: [] },
        elemental_adept: { name: 'Стихийный адепт', url: '/feats/136-elemental_adept/', book: 'PHB', description: '', modAttr: [] },
        durable: { name: 'Стойкий', url: '/feats/137-durable/', book: 'PHB', description: '', modAttr: [{ type:'con', value: 1}] },
        sentinel: { name: 'Страж', url: '/feats/138-sentinel/', book: 'PHB', description: '', modAttr: [] },
        mage_slayer: { name: 'Убийца магов', url: '/feats/139-mage_slayer/', book: 'PHB', description: '', modAttr: [] },
        resilent: { name: 'Устойчивый', url: '/feats/140-resilent/', book: 'PHB', description: '', modAttr: [{ type:'free', value: 1}] },
        crossbow_expert: { name: 'Эксперт в арбалетах', url: '/feats/141-crossbow_expert/', book: 'PHB', description: '', modAttr: [] },
        linguist: { name: 'Языковед', url: '/feats/142-linguist/', book: 'PHB', description: '', modAttr: [{ type:'int', value: 1}] },
    }

    var arrAbilitiesCost = {
        3: 3,
        4: 2,
        5: 2,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
        14: 2,
        15: 2,
        16: 3,
        17: 3,
        18: 4
    }
    
    // Переменные расы
    var optionRace = $('#optionRace');
    var optionRaceSpan = optionRace.find('span.select-race');
    var modalRace = $('#modalRace');
    
    // Переменные вариантов расы
    var optionRaceVariant = $('#optionRaceVariant');
    var optionRaceVariantSpan = optionRaceVariant.find('span.select-race-variant');
    var modalRaceVariant = $('#modalRaceVariant');

    // Переменные предыстории
    var optionBackground = $('#optionBackground');
    var optionBackgroundSpan = optionBackground.find('span.select-background');
    var modalBackground = $('#modalBackground');

    // Переменные базового класса
    var optionClassBase = $('#optionClassBase');
    var optionClassBaseSpan = optionClassBase.find('span.select-class-base');
    var modalClassBase = $('#modalClassBase');

    // Переменные базовых характеристик
    var optionAbilitiesBase = $('#optionAbilitiesBase');
    var optionAbilitiesBaseSpan = optionAbilitiesBase.find('span.select-abilities-base');
    var modalAbilitiesBase = $('#modalAbilitiesBase');

    // Переменные базовых навыков
    var optionSkillsBase = $('#optionSkillsBase');
    var optionSkillsBaseSpan = optionSkillsBase.find('span.select-skills-base');
    var modalSkillsBase = $('#modalSkillsBase');

    // Переменные расовой черты
    var optionFeatBase = $('#optionFeatBase');
    var optionFeatBaseSpan = optionFeatBase.find('span.select-feat-base');
    var modalFeatBase = $('#modalFeatBase');

    // Функция проверки отображения пункта вариантов текущей расы
    function displayRaceVariants(){
        var currKey = optionRaceSpan.attr('dnd-data');
        if (optionRaceVariant.attr('dnd-data') != currKey){
            if ( optionRaceSpan.attr('dnd-data') != '' ){
                optionRaceVariantSpan.attr('dnd-data','').text('Не выбрано');
                optionRaceVariant.attr('dnd-data', currKey).removeClass('hidden');
            } else {
                optionRaceVariant.attr('dnd-data', currKey).addClass('hidden');
                optionRaceVariantSpan.attr('dnd-data','').text('Не выбрано');
                optionFeatBase.attr('dnd-data', '').addClass('hidden');
                optionFeatBaseSpan.attr('dnd-data','').text('Не выбрано');
                optionAbilitiesBase.attr('dnd-data', '').addClass('hidden');
                optionAbilitiesBaseSpan.attr('dnd-data','').text('Не выбрано');
                optionSkillsBase.attr('dnd-data', '').addClass('hidden');
                optionSkillsBaseSpan.attr('dnd-data','').text('Не выбрано');
            }
        }
    }

    // Функция проверки отображения пункта характеристик
    function displayFeatBase(){
        var currKey = (optionRaceSpan.attr('dnd-data') + '__' + optionRaceVariantSpan.attr('dnd-data'));
        if (optionFeatBase.attr('dnd-data') != currKey){
            if ( optionRaceSpan.attr('dnd-data') == 'human'
                && optionRaceVariantSpan.attr('dnd-data') == 'variant_human' ){
                optionFeatBaseSpan.attr('dnd-data','').text('Не выбрано');
                optionFeatBase.attr('dnd-data', currKey).removeClass('hidden');
            } else {
                optionFeatBase.attr('dnd-data', currKey).addClass('hidden');
                optionFeatBaseSpan.attr('dnd-data','').text('Не выбрано');
            }
        }
    }

    // Функция проверки отображения пункта характеристик
    function displayAbilitiesBase(){
        var currKey = (optionRaceSpan.attr('dnd-data') + '__' + optionRaceVariantSpan.attr('dnd-data') + '__' + optionFeatBaseSpan.attr('dnd-data'));
        if (optionAbilitiesBase.attr('dnd-data') != currKey){
            if ( optionRaceSpan.attr('dnd-data') != ''
                && optionRaceVariantSpan.attr('dnd-data') != ''
                && (optionRaceVariantSpan.attr('dnd-data') != 'variant_human'
                    || (optionRaceVariantSpan.attr('dnd-data') == 'variant_human'
                        && optionFeatBaseSpan.attr('dnd-data') != '') )
                        ){
                optionAbilitiesBaseSpan.attr('dnd-data','').text('Не выбрано');
                optionAbilitiesBase.attr('dnd-data', currKey).removeClass('hidden');
            } else {
                optionAbilitiesBase.attr('dnd-data', currKey).addClass('hidden');
                optionAbilitiesBaseSpan.attr('dnd-data','').text('Не выбрано');
            }
        }
    }

    // Функция проверки отображения пункта характеристик
    function displaySkillsBase(){
        var currKey = (optionRaceSpan.attr('dnd-data') + '__' + optionRaceVariantSpan.attr('dnd-data') + '__' + optionFeatBaseSpan.attr('dnd-data') + '__' + optionBackgroundSpan.attr('dnd-data') + '__' + optionClassBaseSpan.attr('dnd-data') + '__' + optionAbilitiesBaseSpan.attr('dnd-data'));
        if (optionSkillsBase.attr('dnd-data') != currKey){
            if ( optionRaceSpan.attr('dnd-data') != ''
                && optionRaceVariantSpan.attr('dnd-data') != ''
                && (optionRaceVariantSpan.attr('dnd-data') != 'variant_human'
                    || (optionRaceVariantSpan.attr('dnd-data') == 'variant_human'
                        && optionFeatBaseSpan.attr('dnd-data') != '') )
                && optionBackgroundSpan.attr('dnd-data') != ''
                && optionClassBaseSpan.attr('dnd-data') != '' 
                && optionAbilitiesBaseSpan.attr('dnd-data') != '' ){
                optionSkillsBaseSpan.attr('dnd-data','').text('Не выбрано');
                optionSkillsBase.attr('dnd-data', currKey).removeClass('hidden');
            } else {
                optionSkillsBase.attr('dnd-data', currKey).addClass('hidden');
                optionSkillsBaseSpan.attr('dnd-data','').text('Не выбрано');
            }
        }
    }

    // Функция заполнения списка рас
    function fillModalListRaces(){
        if ( optionRaceSpan.attr('dnd-data') == ''
            || modalRace.attr('dnd-data') != optionRaceSpan.attr('dnd-data') ){
            modalRace.attr('dnd-data', optionRaceSpan.attr('dnd-data')).html('').append(
                '<div class="modal-content modal-content-listview">'+
                    '<div id="modalRaceBook" style="display: flex; align-items: baseline; margin: 1em 1em 0.5em;" dnd-data="PHB">'+
                        '<div class="tabbed-area-menu" style="display: inline-block; flex: 1 1 0%;">'+
                            '<div class="section-menu section-menu-selected" style="font-size: 1.3em;">PHB</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="content-listview">'+
                        '<div class="div-listview-scroller"></div>'+
                        '<div class="div-listview-info"></div>'+
                    '</div>'+
                    '<div class="modal-buttons">'+
                        '<div class="modal-button modal-button-accept">Применить</div>'+
                        '<div class="modal-button modal-button-cancel">Отменить</div>'+
                        '<div class="modal-button modal-button-prd">PRD</div>'+
                    '</div>'+
                '</div>'
            );
            var lastRaceBook = $('#modalRaceBook').attr('dnd-data');
            var modalRaceList = modalRace.find('div.div-listview-scroller');
            
            // Создание списка
            modalRaceList.html('');
            $.each(arrRaces, function( index, race ) {
                if (race.book == lastRaceBook){
                    modalRaceList.append('<div class="listview-item" style="padding: 0.2em;"><div class="top-div"><div class="listview-title" dnd-data="'+index+'">'+race.name+'</div><img class="action-icon" style="display: none;"><div style="flex: 1 1 0%;"></div><div class="listview-item-level hidden" style="display: inline-block;"><img src="img/icon_ancestry_common.png"></div></div><div class="listview-detail hidden"></div></div>');
                    // console.log( index + ': ' + race.name );
                }
            });
            // Добавление события для выбора изменений
            modalRaceList.find('.listview-item').click(function() {
                var selectRace = $(this).find('.listview-title');
                $(this).parent().find('.listview-title').removeClass('listview-title-selected');
                selectRace.addClass('listview-title-selected');
                optionRaceSpan.attr('dnd-data',selectRace.attr('dnd-data'));
                optionRaceSpan.text(selectRace.text());
            });
            // Добавление события для применения изменений
            modalRace.find('.modal-button-accept').click(function() {
                var selectItem = $(this).closest('.modal-content-listview').find('.listview-title-selected').length;
                if (selectItem > 0){
                    displayRaceVariants();
                    displayAbilitiesBase();
                    displaySkillsBase();
                    displayFeatBase();
                    modalRace.attr('dnd-data', optionRaceSpan.attr('dnd-data'));
                    optionRaceSpan.attr('dnd-backup',optionRaceSpan.attr('dnd-data'));
                    modalRace.removeClass('modal-top');
                }
            });
            // Добавление события для отмены изменений
            modalRace.find('.modal-button-cancel').click(function() {
                if (optionRaceSpan.attr('dnd-backup') != ''){
                    optionRaceSpan.attr('dnd-data',optionRaceSpan.attr('dnd-backup'));
                    optionRaceSpan.text(arrRaces[optionRaceSpan.attr('dnd-backup')].name);
                } else {
                    optionRaceSpan.attr('dnd-data','');
                    optionRaceSpan.text("Не выбрано");
                }
                modalRace.removeClass('modal-top');
            });
        } else {
            console.log('fillModalListRaces false');
        }
    }

    // Функция заполнения списка вариантов расы
    function fillModalListRaceVariants(){
        if ( optionRaceVariantSpan.attr('dnd-data') == ''
            || modalRaceVariant.attr('dnd-data') != optionRaceVariantSpan.attr('dnd-data') ){
            modalRaceVariant.attr('dnd-data', optionRaceVariantSpan.attr('dnd-data')).html('').append(
                '<div class="modal-content modal-content-listview">'+
                    '<div id="modalRaceVariantBook" style="display: flex; align-items: baseline; margin: 1em 1em 0.5em;" dnd-data="PHB">'+
                        '<div class="tabbed-area-menu" style="display: inline-block; flex: 1 1 0%;">'+
                            '<div class="section-menu section-menu-selected" style="font-size: 1.3em;">PHB</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="content-listview">'+
                        '<div class="div-listview-scroller"></div>'+
                        '<div class="div-listview-info"></div>'+
                    '</div>'+
                    '<div class="modal-buttons">'+
                        '<div class="modal-button modal-button-accept">Принять</div>'+
                        '<div class="modal-button modal-button-cancel">Отменить</div>'+
                        '<div class="modal-button modal-button-prd">PRD</div>'+
                    '</div>'+
                '</div>'
            );
            var lastRaceVariantBookBook = $('#modalRaceVariantBook').attr('dnd-data');
            var lastRaceCode = optionRaceVariant.attr('dnd-data');
            var modalRaceVariantList = modalRaceVariant.find('div.div-listview-scroller');
            // Создание списка
            modalRaceVariantList.html('');
            $.each(arrRaces[lastRaceCode].variants, function( index, raceVersion ) {
                if (raceVersion.book == lastRaceVariantBookBook){
                    modalRaceVariantList.append('<div class="listview-item '+lastRaceCode+'" style="padding: 0.2em;"><div class="top-div"><div class="listview-title" dnd-data="'+index+'">'+raceVersion.name+'</div><img class="action-icon" style="display: none;"><div style="flex: 1 1 0%;"></div><div class="listview-item-level hidden" style="display: inline-block;"><img src="img/icon_ancestry_common.png"></div></div><div class="listview-detail hidden"></div></div>');
                    // console.log( index + ': ' + raceVersion.name );
                }
            });
            // Добавление события для выбора изменений
            modalRaceVariantList.find('.listview-item').click(function() {
                var selectRaceVariant = $(this).find('.listview-title');
                $(this).parent().find('.listview-title').removeClass('listview-title-selected');
                selectRaceVariant.addClass('listview-title-selected');
                optionRaceVariantSpan.attr('dnd-data',selectRaceVariant.attr('dnd-data'));
                optionRaceVariantSpan.text(selectRaceVariant.text());
            });
            // Добавление события для применения изменений
            modalRaceVariant.find('.modal-button-accept').click(function() {
                var selectItem = $(this).closest('.modal-content-listview').find('.listview-title-selected').length;
                if (selectItem > 0){
                    displayRaceVariants();
                    displayAbilitiesBase();
                    displaySkillsBase();
                    displayFeatBase();
                    modalRaceVariant.attr('dnd-data', optionRaceVariantSpan.attr('dnd-data'));
                    optionRaceVariantSpan.attr('dnd-backup',optionRaceVariantSpan.attr('dnd-data'));
                    modalRaceVariant.removeClass('modal-top');
                }
            });
            // Добавление события для отмены изменений
            modalRaceVariant.find('.modal-button-cancel').click(function() {
                if (optionRaceVariantSpan.attr('dnd-backup') != ''){
                    optionRaceVariantSpan.attr('dnd-data',optionRaceVariantSpan.attr('dnd-backup'));
                    optionRaceVariantSpan.text(arrRaces[lastRaceCode].variants[optionRaceVariantSpan.attr('dnd-backup')].name);
                } else {
                    optionRaceVariantSpan.attr('dnd-data','');
                    optionRaceVariantSpan.text("Не выбрано");
                }
                modalRaceVariant.removeClass('modal-top');
            });
        } else {
            console.log('fillModalListRaceVariants false');
        }
    }

    // Функция заполнения списка фитов для расы
    function fillModalFeatBase(){
        if ( optionFeatBaseSpan.attr('dnd-data') == ''
            || modalFeatBase.attr('dnd-data') != optionFeatBaseSpan.attr('dnd-data') ){
            modalFeatBase.attr('dnd-data', optionFeatBaseSpan.attr('dnd-data')).html('').append(
                '<div class="modal-content modal-content-listview">'+
                    '<div id="modalFeatBaseBook" style="display: flex; align-items: baseline; margin: 1em 1em 0.5em;" dnd-data="PHB">'+
                        '<div class="tabbed-area-menu" style="display: inline-block; flex: 1 1 0%;">'+
                            '<div class="section-menu section-menu-selected" style="font-size: 1.3em;">PHB</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="content-listview">'+
                        '<div class="div-listview-scroller"></div>'+
                        '<div class="div-listview-info"></div>'+
                    '</div>'+
                    '<div class="modal-buttons">'+
                        '<div class="modal-button modal-button-accept">Принять</div>'+
                        '<div class="modal-button modal-button-cancel">Отменить</div>'+
                        '<div class="modal-button modal-button-prd">PRD</div>'+
                    '</div>'+
                '</div>'
            );
            var lastFeatBaseBook = $('#modalFeatBaseBook').attr('dnd-data');
            var modalFeatBaseList = modalFeatBase.find('div.div-listview-scroller');
            // Создание списка
            modalFeatBaseList.html('');
            $.each(arrFeats, function( index, currentFeat ) {
                if (currentFeat.book == lastFeatBaseBook){
                    modalFeatBaseList.append('<div class="listview-item" style="padding: 0.2em;"><div class="top-div"><div class="listview-title" dnd-data="'+index+'">'+currentFeat.name+'</div><img class="action-icon" style="display: none;"><div style="flex: 1 1 0%;"></div><div class="listview-item-level hidden" style="display: inline-block;"><img src="img/icon_ancestry_common.png"></div></div><div class="listview-detail hidden"></div></div>');
                    // console.log( index + ': ' + currentFeat.name );
                }
            });
            // Добавление события для выбора изменений
            modalFeatBaseList.find('.listview-item').click(function() {
                var selectFeatBase = $(this).find('.listview-title');
                $(this).parent().find('.listview-title').removeClass('listview-title-selected');
                selectFeatBase.addClass('listview-title-selected');
                optionFeatBaseSpan.attr('dnd-data',selectFeatBase.attr('dnd-data'));
                optionFeatBaseSpan.text(selectFeatBase.text());
            });
            // Добавление события для применения изменений
            modalFeatBase.find('.modal-button-accept').click(function() {
                var selectItem = $(this).closest('.modal-content-listview').find('.listview-title-selected').length;
                if (selectItem > 0){
                    displayRaceVariants();
                    displayAbilitiesBase();
                    displaySkillsBase();
                    displayFeatBase();
                    modalFeatBase.attr('dnd-data', optionFeatBaseSpan.attr('dnd-data'));
                    optionFeatBaseSpan.attr('dnd-backup',optionFeatBaseSpan.attr('dnd-data'));
                    modalFeatBase.removeClass('modal-top');
                }
            });
            // Добавление события для отмены изменений
            modalFeatBase.find('.modal-button-cancel').click(function() {
                if (optionFeatBaseSpan.attr('dnd-backup') != ''){
                    optionFeatBaseSpan.attr('dnd-data',optionFeatBaseSpan.attr('dnd-backup'));
                    optionFeatBaseSpan.text(arrFeats[optionFeatBaseSpan.attr('dnd-backup')].name);
                } else {
                    optionFeatBaseSpan.attr('dnd-data','');
                    optionFeatBaseSpan.text("Не выбрано");
                }
                modalFeatBase.removeClass('modal-top');
            });
        } else {
            console.log('fillModalFeatBase false');
        }
    }

    // Функция заполнения списка предысторий
    function fillModalBackgrounds(){
        if ( optionBackgroundSpan.attr('dnd-data') == ''
            || modalBackground.attr('dnd-data') != optionBackgroundSpan.attr('dnd-data') ){
            modalBackground.attr('dnd-data', optionBackgroundSpan.attr('dnd-data')).html('').append(
                '<div class="modal-content modal-content-listview">'+
                    '<div id="modalBackgroundBook"  style="display: flex; align-items: baseline; margin: 1em 1em 0.5em;" dnd-data="PHB">'+
                        '<div class="tabbed-area-menu" style="display: inline-block; flex: 1 1 0%;">'+
                            '<div class="section-menu section-menu-selected" style="font-size: 1.3em;">PHB</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="content-listview">'+
                        '<div class="div-listview-scroller"></div>'+
                        '<div class="div-listview-info"></div>'+
                    '</div>'+
                    '<div class="modal-buttons">'+
                        '<div class="modal-button modal-button-accept">Принять</div>'+
                        '<div class="modal-button modal-button-cancel">Отменить</div>'+
                        '<div class="modal-button modal-button-prd">PRD</div>'+
                    '</div>'+
                '</div>'
            );
            var lastBackgroundBook = $('#modalBackgroundBook').attr('dnd-data');
            var modalBackgroundList = modalBackground.find('div.div-listview-scroller');
            // Создание списка
            modalBackgroundList.html('');
            $.each(arrBackgrounds, function( index, backgrounds ) {
                if (backgrounds.book == lastBackgroundBook){
                    modalBackgroundList.append('<div class="listview-item" style="padding: 0.2em;"><div class="top-div"><div class="listview-title" dnd-data="'+index+'">'+backgrounds.name+'</div><img class="action-icon" style="display: none;"><div style="flex: 1 1 0%;"></div><div class="listview-item-level hidden" style="display: inline-block;"><img src="img/icon_ancestry_common.png"></div></div><div class="listview-detail hidden"></div></div>');
                    // console.log( index + ': ' + backgrounds.name );
                }
            });
            // Добавление события для выбора изменений
            modalBackgroundList.find('.listview-item').click(function() {
                var selectBackground = $(this).find('.listview-title');
                $(this).parent().find('.listview-title').removeClass('listview-title-selected');
                selectBackground.addClass('listview-title-selected');
                optionBackgroundSpan.attr('dnd-data',selectBackground.attr('dnd-data'));
                optionBackgroundSpan.text(selectBackground.text());
            });
            // Добавление события для применения изменений
            modalBackground.find('.modal-button-accept').click(function() {
                var selectItem = $(this).closest('.modal-content-listview').find('.listview-title-selected').length;
                if (selectItem > 0){
                    displayRaceVariants();
                    displayAbilitiesBase();
                    displaySkillsBase();
                    displayFeatBase();
                    modalBackground.attr('dnd-data', optionBackgroundSpan.attr('dnd-data'));
                    optionBackgroundSpan.attr('dnd-backup',optionBackgroundSpan.attr('dnd-data'));
                    modalBackground.removeClass('modal-top');
                }
            });
            // Добавление события для отмены изменений
            modalBackground.find('.modal-button-cancel').click(function() {
                if (optionBackgroundSpan.attr('dnd-backup') != ''){
                    optionBackgroundSpan.attr('dnd-data',optionBackgroundSpan.attr('dnd-backup'));
                    optionBackgroundSpan.text(arrBackgrounds[optionBackgroundSpan.attr('dnd-backup')].name);
                } else {
                    optionBackgroundSpan.attr('dnd-data','');
                    optionBackgroundSpan.text("Не выбрано");
                }
                modalBackground.removeClass('modal-top');
            });
        } else {
            console.log('fillModalBackgrounds false');
        }
    }

    // Функция заполнения списка классов
    function fillModalClassBase(){
        if ( optionClassBaseSpan.attr('dnd-data') == ''
            || modalClassBase.attr('dnd-data') != optionClassBaseSpan.attr('dnd-data') ){
            modalClassBase.attr('dnd-data', optionClassBaseSpan.attr('dnd-data')).html('').append(
                '<div class="modal-content modal-content-listview">'+
                    '<div id="modalClassBaseBook" style="display: flex; align-items: baseline; margin: 1em 1em 0.5em;" dnd-data="PHB">'+
                        '<div class="tabbed-area-menu" style="display: inline-block; flex: 1 1 0%;">'+
                            '<div class="section-menu section-menu-selected" style="font-size: 1.3em;">PHB</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="content-listview">'+
                        '<div class="div-listview-scroller"></div>'+
                        '<div class="div-listview-info"></div>'+
                    '</div>'+
                    '<div class="modal-buttons">'+
                        '<div class="modal-button modal-button-accept">Принять</div>'+
                        '<div class="modal-button modal-button-cancel">Отменить</div>'+
                        '<div class="modal-button modal-button-prd">PRD</div>'+
                    '</div>'+
                '</div>'
            );
            var lastClassBaseBook = $('#modalClassBaseBook').attr('dnd-data');
            var modalClassBaseList = modalClassBase.find('div.div-listview-scroller');
            // Создание списка
            modalClassBaseList.html('');
            $.each(arrClasses, function( index, currentClass ) {
                if (currentClass.book == lastClassBaseBook){
                    modalClassBaseList.append('<div class="listview-item" style="padding: 0.2em;"><div class="top-div"><div class="listview-title" dnd-data="'+index+'">'+currentClass.name+'</div><img class="action-icon" style="display: none;"><div style="flex: 1 1 0%;"></div><div class="listview-item-level hidden" style="display: inline-block;"><img src="img/icon_ancestry_common.png"></div></div><div class="listview-detail hidden"></div></div>');
                    // console.log( index + ': ' + currentClass.name );
                }
            });
            // Добавление события для выбора изменений
            modalClassBaseList.find('.listview-item').click(function() {
                var selectClassBase = $(this).find('.listview-title');
                $(this).parent().find('.listview-title').removeClass('listview-title-selected');
                selectClassBase.addClass('listview-title-selected');
                optionClassBaseSpan.attr('dnd-data',selectClassBase.attr('dnd-data'));
                optionClassBaseSpan.text(selectClassBase.text());
            });
            // Добавление события для применения изменений
            modalClassBase.find('.modal-button-accept').click(function() {
                var selectItem = $(this).closest('.modal-content-listview').find('.listview-title-selected').length;
                if (selectItem > 0){
                    displayRaceVariants();
                    displayAbilitiesBase();
                    displaySkillsBase();
                    displayFeatBase();
                    modalClassBase.attr('dnd-data', optionClassBaseSpan.attr('dnd-data'));
                    optionClassBaseSpan.attr('dnd-backup',optionClassBaseSpan.attr('dnd-data'));
                    modalClassBase.removeClass('modal-top');
                }
            });
            // Добавление события для отмены изменений
            modalClassBase.find('.modal-button-cancel').click(function() {
                if (optionClassBaseSpan.attr('dnd-backup') != ''){
                    optionClassBaseSpan.attr('dnd-data',optionClassBaseSpan.attr('dnd-backup'));
                    optionClassBaseSpan.text(arrClasses[optionClassBaseSpan.attr('dnd-backup')].name);
                } else {
                    optionClassBaseSpan.attr('dnd-data','');
                    optionClassBaseSpan.text("Не выбрано");
                }
                modalClassBase.removeClass('modal-top');
            });
        } else {
            console.log('fillModalClassBase false');
        }
    }

    // Функция заполнения окна характеристик
    function fillModalAbilitiesBase(){
        if ( modalAbilitiesBase.attr('dnd-data') != optionAbilitiesBase.attr('dnd-data') ){
            modalAbilitiesBase.attr('dnd-data', optionAbilitiesBase.attr('dnd-data')).html('').append(
                '<div class="modal-content" style="width: 40em;">'+
                    '<div class="dialog-top-bar">'+
                        '<div class="dialog-title">Установите стартовые характеристики</div>'+
                        '<div></div>'+
                        '<div style="display: none;"></div>'+
                    '</div>'+
                    '<div class="padding-standard">'+
                        '<div class="rounded-rectangle-white race-modifiers-wrap"></div>'+
                        '<div class="rounded-rectangle-white feat-modifiers-wrap hidden"></div>'+
                        '<div class="rounded-rectangle-white set-points-wrap"></div>'+
                    '</div>'+
                    '<div class="modal-buttons">'+
                        '<div class="modal-button modal-button-finished">Завершить</div>'+
                    '</div>'+
                '</div>'
            );
            // race-modifiers
            var lastRaceCode = optionRaceSpan.attr('dnd-data');
            var lastRaceVariantCode = optionRaceVariantSpan.attr('dnd-data');
            var raceModifiers = modalAbilitiesBase.find('.race-modifiers-wrap');
            raceModifiers.html('').append('<div class="bold-standard">Расовые модификаторы</div><p class="hidden warning-text">Illegal Ancestry Boosts!</p>');
            $.each(arrRaces[lastRaceCode].variants[lastRaceVariantCode].modAttr, function( index, abilities ) {
                // console.log( abilities.type + ': ' + abilities.value );
                if (abilities.type != 'free'){
                    raceModifiers.append('<span class="race-modifiers race-modifier'+(index+1)+'" style="margin-right: 0.5em;margin-bottom: 0.6em; font-size: 1.2em;"><img class="small-icon" src="img/icon_boost.png"><span class="small-margin-right-bottom race-modifier-values race-modifier-value'+(index+1)+'" dnd-data="'+abilities.value+'">'+abilities.value+'</span> <span class="small-margin-right-bottom race-modifier-types race-modifier-type'+(index+1)+'" dnd-data="'+abilities.type+'">'+nameAbilities[abilities.type].fullname+'</span></span>');
                } else {
                    var spanSelect = '<select class="small-margin-right-bottom spinner-dark race-modifier-types race-modifier-type'+(index+1)+'" dnd-data="str">';
                    var countOptions = 0;
                    $.each(nameAbilities, function( nameAblts, abilities ) {
                        if ( nameAblts != 'free' && nameAblts != 'all' ){
                            var selectedOption = '';
                            if (countOptions == index){
                                selectedOption = ' selected';
                            }
                            spanSelect += '<option value="' + nameAblts + '"' + selectedOption + '>' + abilities.fullname + '</option>';
                            countOptions += 1;
                        }
                    });
                    spanSelect += '</select>';
                    raceModifiers.append('<span class="race-modifiers race-modifier'+(index+1)+'" style="margin-right: 0.5em;margin-bottom: 0.6em; font-size: 1.2em;"><img class="small-icon" src="img/icon_boost.png"><span class="small-margin-right-bottom race-modifier-values race-modifier-value'+(index+1)+'" dnd-data="'+abilities.value+'">'+abilities.value+'</span> ' + spanSelect + '</span>');
                }
            });
            // feat-modifiers
            var lastFeatCode = optionFeatBaseSpan.attr('dnd-data');
            var featModifiers = modalAbilitiesBase.find('.feat-modifiers-wrap');
            featModifiers.html('');
            if (lastFeatCode != '' && optionFeatBaseSpan.not('.hidden') && arrFeats[lastFeatCode].modAttr.length > 0){
                featModifiers.removeClass('hidden');
                featModifiers.append('<div class="bold-standard">Модификаторы от черты</div><p class="hidden warning-text">Illegal Ancestry Boosts!</p>');
                $.each(arrFeats[lastFeatCode].modAttr, function( index, abilities ) {
                    // console.log( abilities.type + ': ' + abilities.value );
                    if (abilities.type != 'var'){
                        featModifiers.append('<span class="feat-modifiers feat-modifier'+(index+1)+'" style="margin-right: 0.5em;margin-bottom: 0.6em; font-size: 1.2em;"><img class="small-icon" src="img/icon_boost.png"><span class="small-margin-right-bottom feat-modifier-values feat-modifier-value'+(index+1)+'" dnd-data="'+abilities.value+'">'+abilities.value+'</span> <span class="small-margin-right-bottom feat-modifier-types feat-modifier-type'+(index+1)+'" dnd-data="'+abilities.type+'">'+nameAbilities[abilities.type].fullname+'</span></span>');
                    } else {
                        var spanSelect = '<select class="small-margin-right-bottom spinner-dark feat-modifier-types feat-modifier-type'+(index+1)+'" dnd-data="str">';
                        $.each(abilities.variants, function( index2, abilities2 ) {
                            // type, value
                            var selectedOption = '';
                            console.log('index2: ' + index2);
                            if (index2 == 0){
                                selectedOption = ' selected';
                            }
                            spanSelect += '<option value="' + abilities2 + '"' + selectedOption + '>' + nameAbilities[abilities2].fullname + '</option>';
                        });
                        spanSelect += '</select>';
                        featModifiers.append('<span class="feat-modifiers feat-modifier'+(index+1)+'" style="margin-right: 0.5em;margin-bottom: 0.6em; font-size: 1.2em;"><img class="small-icon" src="img/icon_boost.png"><span class="small-margin-right-bottom feat-modifier-values feat-modifier-value'+(index+1)+'" dnd-data="'+abilities.value+'">'+abilities.value+'</span> ' + spanSelect + '</span>');
                    }
                });
            } else {
                featModifiers.addClass('hidden');
            }
            // point-buy
            var setPoints = modalAbilitiesBase.find('.set-points-wrap');
            setPoints.html('');
            // main body of calc_stats
            setPoints.append('<div class="bold-standard" style="margin-bottom: 0.5em;">'+
                                '<select class="small-margin-right-bottom spinner-dark set-modifier-types" dnd-data="">'+
                                '<option value="point_buy" selected>Закупка характеристик</option>'+
                                '<option value="point_distr">Распределение характеристик</option>'+
                                '<option value="point_cust">Пользовательское распределение</option>'+
                                '</select>'+
                            '</div>'+
                            '<div class="grid-container"><div class="calc_stats" data-update="0"></div></div>');
            var calc_stats = setPoints.find('.calc_stats');
            // calc_stats header-column
            calc_stats.append('<div class="co header-column">'+
                                '<div class="ro header-line">Хар-ка:</div>'+
                                '<div class="ro header-line">Значение:</div>'+
                                '<div class="ro header-line">Бон. расы:</div>'+
                                '<div class="ro header-line">Бон. черты:</div>'+
                                '<div class="ro header-line">Модиф.:</div>'+
                                '<div class="ro header-line">Итого:</div>'+
                                '<div class="ro header-line">Очки <span id="calc_cost_current">0</span>/<span id="calc_cost_max">27</span></div>'+
                                '</div>');
            // calc_stats stat_new
            $.each(nameAbilities, function( index, abilities ) {
                // console.log( abilities.type + ': ' + abilities.value );
                if ( index != 'free' && index != 'all' ){
                    calc_stats.append('<div class="co stat_new">'+
                                        '<span class="ro stat__abr"><span>'+abilities.shortname+'</span></span>'+
                                        '<span class="ro stat__value" dnd-data="'+index+'">'+
                                            '<span class="calc_stat_button btn btn-minus" dnd-data="'+index+'">-</span>'+
                                            '<span class="calc_stat_input btn" id="calc_'+index+'_base">8</span>'+
                                            '<span class="calc_stat_button btn btn-plus" dnd-data="'+index+'">+</span>'+
                                        '</span>'+
                                        '<span class="ro stat__race_bon"><span id="calc_'+index+'_race">0</span></span>'+
                                        '<span class="ro stat__feat_bon"><span id="calc_'+index+'_feat">0</span></span>'+
                                        '<span class="ro stat__mod"><span id="calc_'+index+'_mod" class="stat_value_bold">-1</span></span>'+
                                        '<span class="ro stat__total"><span id="calc_'+index+'_total" class="stat_value_bold">8</span></span>'+
                                        '<span class="ro stat__points"><span id="calc_'+index+'_cost">0</span></span>'+
                                        '</div>');
                }
            });

            function recalc_race_modifier(){
                var raceModifiersSelect = {};
                raceModifiers.find('.race-modifiers').each(function(){
                    var typeModifier = $(this).find('.race-modifier-types').attr('dnd-data');
                    var valueModifier = $(this).find('.race-modifier-values').attr('dnd-data');
                    raceModifiersSelect[typeModifier] = valueModifier;
                })
                console.log(raceModifiersSelect);
                if (Object.keys(raceModifiersSelect).length > 0){
                    if (raceModifiersSelect.hasOwnProperty('all')){
                        setPoints.find('#calc_str_race').html(raceModifiersSelect['all']);
                        setPoints.find('#calc_dex_race').html(raceModifiersSelect['all']);
                        setPoints.find('#calc_con_race').html(raceModifiersSelect['all']);
                        setPoints.find('#calc_int_race').html(raceModifiersSelect['all']);
                        setPoints.find('#calc_wis_race').html(raceModifiersSelect['all']);
                        setPoints.find('#calc_cha_race').html(raceModifiersSelect['all']);
                    } else {
                        setPoints.find('.stat__race_bon > span').html('0');
                        $.each(raceModifiersSelect, function( index, raceMod ) {
                            if ( index != 'free' && index != 'all' ){
                                setPoints.find('#calc_' + index + '_race').html(raceMod);
                            }
                        });
                    }
                }
            } recalc_race_modifier();

            function recalc_feat_modifier(){
                var featModifiersSelect = {};
                featModifiers.find('.feat-modifiers').each(function(){
                    var typeModifier = $(this).find('.feat-modifier-types').attr('dnd-data');
                    var valueModifier = $(this).find('.feat-modifier-values').attr('dnd-data');
                    featModifiersSelect[typeModifier] = valueModifier;
                })
                console.log(featModifiersSelect);
                if (Object.keys(featModifiersSelect).length > 0){
                    if (featModifiersSelect.hasOwnProperty('all')){
                        setPoints.find('#calc_str_feat').html(featModifiersSelect['all']);
                        setPoints.find('#calc_dex_feat').html(featModifiersSelect['all']);
                        setPoints.find('#calc_con_feat').html(featModifiersSelect['all']);
                        setPoints.find('#calc_int_feat').html(featModifiersSelect['all']);
                        setPoints.find('#calc_wis_feat').html(featModifiersSelect['all']);
                        setPoints.find('#calc_cha_feat').html(featModifiersSelect['all']);
                    } else {
                        setPoints.find('.stat__feat_bon > span').html('0');
                        $.each(featModifiersSelect, function( index, featMod ) {
                            if ( index != 'free' && index != 'all' ){
                                setPoints.find('#calc_' + index + '_feat').html(featMod);
                            }
                        });
                    }
                }
            } recalc_feat_modifier();

            function recalc_final_modifier(){
                var setPointsType = setPoints.find('select.set-modifier-types').attr('dnd-data');
                $.each(nameAbilities, function( nameAblts, abilities ) {
                    if ( nameAblts != 'free' && nameAblts != 'all' ){
                        var baseAblts = parseInt($('#calc_' + nameAblts + '_base').attr('dnd-data'));
                        var raceAblts = parseInt($('#calc_' + nameAblts + '_race').html());
                        var featAblts = parseInt($('#calc_' + nameAblts + '_feat').html());
                        var totalAblts = baseAblts + raceAblts + featAblts;
                        var totalMod = ( totalAblts - 10 - ( totalAblts % 2 ) ) / 2;
                        $('#calc_' + nameAblts + '_total').html(totalAblts);
                        $('#calc_' + nameAblts + '_mod').html(totalMod);
                    }
                });
                var completeAbilities = false;
                if ( setPointsType == 'point_buy' ){
                    if ( parseInt($('#calc_cost_current').html()) == parseInt($('#calc_cost_max').html()) ){
                        completeAbilities = true;
                    }
                } else if ( setPointsType == 'point_distr' ) {
                    completeAbilities = true;
                    modalAbilitiesBase.find('select.set-attr-values').each(function(){
                        if ( $(this).attr('dnd-data') == "0" ){
                            completeAbilities = false;
                        }
                    });
                } else if ( setPointsType == 'point_cust' ) {
                    completeAbilities = true;
                    modalAbilitiesBase.find('.stat__value > input').each(function(){
                        if ( isNaN(parseInt($(this).val()))  ){
                            completeAbilities = false;
                        }
                    });
                }
                if (completeAbilities){
                    var abilitiesString = '';
                    modalAbilitiesBase.find('.ro.stat__total > span').each(function(){
                        if ( abilitiesString != ''  ){
                            abilitiesString += '-';
                        }
                        abilitiesString += $(this).html();
                    });
                    optionAbilitiesBaseSpan.text(abilitiesString);
                    var abilitiesObj = {};
                    abilitiesObj['race_modifiers'] = [];
                    modalAbilitiesBase.find('span.race-modifiers').each(function(){
                        var valueEl = $(this).find('.race-modifier-values').attr('dnd-data');
                        var typeEl = $(this).find('.race-modifier-types').attr('dnd-data');
                        abilitiesObj['race_modifiers'].push({type: typeEl, value: valueEl});
                    });
                    abilitiesObj['feat_modifiers'] = [];
                    modalAbilitiesBase.find('span.feat-modifiers').each(function(){
                        var valueEl = $(this).find('.feat-modifier-values').attr('dnd-data');
                        var typeEl = $(this).find('.feat-modifier-types').attr('dnd-data');
                        abilitiesObj['feat_modifiers'].push({type: typeEl, value: valueEl});
                    });
                    abilitiesObj['set_modifier_types'] = modalAbilitiesBase.find('select.set-modifier-types').attr('dnd-data');
                    abilitiesObj['calc_base'] = {};
                    $.each(nameAbilities, function( nameAblts, abilities ) {
                        if ( nameAblts != 'free' && nameAblts != 'all' ){
                            abilitiesObj['calc_base'][nameAblts] = parseInt($('#calc_' + nameAblts + '_base').attr('dnd-data'));
                        }
                    });
                    optionAbilitiesBaseSpan.attr('dnd-data',JSON.stringify(abilitiesObj));
                } else {
                    optionAbilitiesBaseSpan.attr('dnd-data','');
                    optionAbilitiesBaseSpan.text('Не выбрано');
                }
                displayRaceVariants();
                displayAbilitiesBase();
                displaySkillsBase();
                displayFeatBase();
            } recalc_final_modifier();

            function reset_final_modifier(){
                var setPointsType = setPoints.find('select.set-modifier-types').attr('dnd-data');
                if ( setPointsType != 'point_buy'){
                    $('#calc_cost_current').html('0').closest('.ro').addClass('hidden');
                    $.each(nameAbilities, function( nameAblts, abilities ) {
                        if ( nameAblts != 'free' && nameAblts != 'all' ){
                            $('#calc_' + nameAblts + '_cost').html('0').closest('.ro').addClass('hidden');
                        }
                    });
                } else {
                    $('#calc_cost_current').html('0').closest('.ro').removeClass('hidden');
                    $.each(nameAbilities, function( nameAblts, abilities ) {
                        if ( nameAblts != 'free' && nameAblts != 'all' ){
                            $('#calc_' + nameAblts + '_cost').html('0').closest('.ro').removeClass('hidden');
                        }
                    });
                }
            };

            raceModifiers.find('select.race-modifier-types').each(function() {
                $(this).change(function() {
                    $(this).attr('dnd-data',$(this).find('option:selected:first').val());
                    var raceModifiersSelect = [];
                    $(this).parent().parent().find('select.race-modifier-types').each(function(){
                        raceModifiersSelect.push($(this).attr('dnd-data'));
                    }).each(function(){
                        $(this).find("option").each(function(){
                            if ($(this).is(':not(:selected)') && $.inArray( $(this).val(), raceModifiersSelect ) >= 0) {
                                $(this).attr('disabled', true);
                            } else {
                                $(this).attr('disabled', false);
                            }
                        });
                    });
                    recalc_race_modifier();
                    recalc_final_modifier();
                }).change();
            });

            featModifiers.find('select.feat-modifier-types').each(function() {
                $(this).change(function() {
                    $(this).attr('dnd-data',$(this).find('option:selected:first').val());
                    var featModifiersSelect = [];
                    $(this).parent().parent().find('select.feat-modifier-types').each(function(){
                        featModifiersSelect.push($(this).attr('dnd-data'));
                    }).each(function(){
                        $(this).find("option").each(function(){
                            if ($(this).is(':not(:selected)') && $.inArray( $(this).val(), featModifiersSelect ) >= 0) {
                                $(this).attr('disabled', true);
                            } else {
                                $(this).attr('disabled', false);
                            }
                        });
                    });
                    recalc_feat_modifier();
                    recalc_final_modifier();
                }).change();
            });

            setPoints.find('select.set-modifier-types').change(function() {
                if ( $(this).attr('dnd-data') != $(this).val() ){
                    $(this).attr('dnd-data',$(this).val());
                    var setPoints = $(this).closest('.set-points-wrap');
                    var setType = $(this).val();
                    if ( setType == 'point_buy' ){
                        // create elements for point buy
                        setPoints.find('span.ro.stat__value').each(function(){
                            var typeStatValue = $(this).attr('dnd-data');
                            $(this).html('').append('<span class="calc_stat_button btn btn-minus" dnd-data="'+typeStatValue+'">-</span>'+
                                                    '<span class="calc_stat_input btn" id="calc_'+typeStatValue+'_base" dnd-data="8">8</span>'+
                                                    '<span class="calc_stat_button btn btn-plus" dnd-data="'+typeStatValue+'">+</span>');
                        });

                        // stat minus function
                        setPoints.find('span.calc_stat_button.btn-minus').click(function() {
                            var typeStat = $(this).attr('dnd-data');
                            var statValueBtn = $('#calc_' + typeStat + '_base');
                            var statValue = parseInt(statValueBtn.html());
                            var calc_cost_currentSpan = $('#calc_cost_current');
                            var calc_cost_current = parseInt(calc_cost_currentSpan.html());
                            var calc_cost_maxSpan = $('#calc_cost_max');
                            var calc_cost_max = parseInt(calc_cost_maxSpan.html());
                            var calc_str_costSpan = $('#calc_' + typeStat + '_cost');
                            var calc_str_cost = parseInt(calc_str_costSpan.html());
                            console.log('minus ' + typeStat + ': ' + statValue);
                            var cost_minus = arrAbilitiesCost[statValue];
                            if ( statValue > 8){
                                if (calc_cost_current >= cost_minus){
                                    calc_cost_currentSpan.html(calc_cost_current - cost_minus);
                                    statValueBtn.html(statValue - 1);
                                    statValueBtn.attr('dnd-data',(statValue - 1));
                                    calc_str_costSpan.html(calc_str_cost - cost_minus);
                                    recalc_final_modifier();
                                } else {
                                    console.log('too many points abilities');
                                }
                            } else {
                                console.log('value ' + typeStat + ' too low');
                            }
                        });

                        // stat plus function
                        setPoints.find('span.calc_stat_button.btn-plus').click(function() {
                            var typeStat = $(this).attr('dnd-data');
                            var statValueBtn = $('#calc_' + typeStat + '_base');
                            var statValue = parseInt(statValueBtn.html());
                            var calc_cost_currentSpan = $('#calc_cost_current');
                            var calc_cost_current = parseInt(calc_cost_currentSpan.html());
                            var calc_cost_maxSpan = $('#calc_cost_max');
                            var calc_cost_max = parseInt(calc_cost_maxSpan.html());
                            var calc_str_costSpan = $('#calc_' + typeStat + '_cost');
                            var calc_str_cost = parseInt(calc_str_costSpan.html());
                            console.log('plus ' + typeStat + ': ' + statValue);
                            var cost_plus = arrAbilitiesCost[statValue + 1];
                            if ( statValue < 15){
                                if ((calc_cost_max - calc_cost_current) >= cost_plus){
                                    calc_cost_currentSpan.html(calc_cost_current + cost_plus);
                                    statValueBtn.html(statValue + 1);
                                    statValueBtn.attr('dnd-data',(statValue + 1));
                                    calc_str_costSpan.html(calc_str_cost + cost_plus);
                                    recalc_final_modifier();
                                } else {
                                    console.log('not enought points abilities');
                                }
                            } else {
                                console.log('value ' + typeStat + ' too hight');
                            }
                        });
                    } else if ( setType == 'point_distr' ){
                        // create elements for point distribution
                        setPoints.find('span.ro.stat__value').each(function(){
                            var typeStatValue = $(this).attr('dnd-data');
                            $(this).html('').append('<select class="small-margin-right-bottom spinner-dark set-attr-values" id="calc_'+typeStatValue+'_base" dnd-data="0">'+
                                                    '<option value="0" selected>-</option>'+
                                                    '<option value="15">15</option>'+
                                                    '<option value="14">14</option>'+
                                                    '<option value="13">13</option>'+
                                                    '<option value="12">12</option>'+
                                                    '<option value="10">10</option>'+
                                                    '<option value="8">8</option>'+
                                                    '</select>');
                        });
                        setPoints.find('select.set-attr-values').each(function() {
                            $(this).change(function() {
                                $(this).attr('dnd-data',$(this).find('option:selected:first').val());
                                var attrPointsSelect = [];
                                $(this).closest('.calc_stats').find('select.set-attr-values').each(function(){
                                    if ($(this).attr('dnd-data') != '0') { attrPointsSelect.push($(this).attr('dnd-data')); }
                                }).each(function(){
                                    $(this).find("option").each(function(){
                                        if ($(this).is(':not(:selected)') && $.inArray( $(this).val(), attrPointsSelect ) >= 0) {
                                            $(this).attr('disabled', true);
                                        } else {
                                            $(this).attr('disabled', false);
                                        }
                                    });
                                });
                                recalc_final_modifier();
                            }).change();
                        });
                    } else if ( setType == 'point_cust' ){
                        // create elements for custom point
                        setPoints.find('span.ro.stat__value').each(function(){
                            var typeStatValue = $(this).attr('dnd-data');
                            $(this).html('').append('<input type="number" class="edittext-dark" style="width: 3em;" id="calc_'+typeStatValue+'_base" dnd-data="8" value="8">');
                        });
                        
                        setPoints.find('input.edittext-dark').each(function() {
                            $(this).change(function() {
                                $(this).attr('dnd-data',$(this).val());
                                recalc_final_modifier();
                            }).change();
                        });
                    }
                    reset_final_modifier();
                    recalc_final_modifier();
                }
            }).change();

            modalAbilitiesBase.find('.modal-button-finished').click(function() {
                modalAbilitiesBase.removeClass('modal-top');
            });
        } else {
            console.log('fillModalAbilitiesBase false');
        }
    }

    // Функция заполнения окна характеристик
    function fillModaloptionSkillsBase(){
        if ( modalSkillsBase.attr('dnd-data') != optionSkillsBase.attr('dnd-data') ){
            modalSkillsBase.attr('dnd-data', optionSkillsBase.attr('dnd-data'));
            var lastRaceCode = optionRaceSpan.attr('dnd-data');
            var lastRaceVariantCode = optionRaceVariantSpan.attr('dnd-data');
            var raceModifiers = modalSkillsBase.find('.race-modifiers-wrap');
            raceModifiers.html('');
            raceModifiers.append('<div class="bold-standard" style="margin-bottom: 0.6em; font-size: 1.2em;">Расовые модификаторы</div><p class="hidden warning-text">Illegal Ancestry Boosts!</p>');
            $.each(arrRaces[lastRaceCode].variants[lastRaceVariantCode].modAttr, function( index, abilities ) {
                // console.log( abilities.type + ': ' + abilities.value );
                if (abilities.type != 'free'){
                    raceModifiers.append('<span class="race-modifiers race-modifier'+(index+1)+'" style="margin-right: 0.5em;margin-bottom: 0.6em; font-size: 1.2em;"><img class="small-icon" src="img/icon_boost.png"><span class="small-margin-right-bottom race-modifier'+(index+1)+'-value" dnd-data="'+abilities.value+'">'+abilities.value+'</span> <span class="small-margin-right-bottom race-modifier'+(index+1)+'-type" dnd-data="intelligence">'+nameAbilities[abilities.type].fullname+'</span></span>');
                } else {
                    raceModifiers.append('<span class="race-modifiers race-modifier'+(index+1)+'" style="margin-right: 0.5em;margin-bottom: 0.6em; font-size: 1.2em;"><img class="small-icon" src="img/icon_boost.png"><select class="small-margin-right-bottom spinner-dark race-modifier'+(index+1)+'-value" dnd-data="'+abilities.value+'"><option value="str">Сила</option><option value="dex">Ловкость</option><option value="con">Телосложение</option><option value="int">Интеллект</option><option value="wis">Мудрость</option><option value="cha">Харизма</option></select></span>');
                }
            });

            modalSkillsBase.find('.modal-button-finished').click(function() {
                modalSkillsBase.removeClass('modal-top');
            });
        } else {
            console.log('fillModaloptionSkillsBase false');
        }
    }

    // Выбор расы
    optionRace.click(function() {
        fillModalListRaces();
        var lastRaceCode = optionRaceSpan.attr('dnd-data');
        modalRace.find('.listview-item').each(function() {
            var selectRace = $(this).find('.listview-title');
            if (selectRace.attr('dnd-data') == lastRaceCode){
                selectRace.addClass('listview-title-selected');
            } else{
                selectRace.removeClass('listview-title-selected');
            }
        });
        modalRace.addClass('modal-top');
    });

    // Выбор варианта расы
    optionRaceVariant.click(function() {
        fillModalListRaceVariants();
        modalRaceVariant.find('.listview-item').each(function() {
            var selectRaceVariant = $(this).find('.listview-title');
            if (selectRaceVariant.attr('dnd-data') == optionRaceVariantSpan.attr('dnd-data')){
                selectRaceVariant.addClass('listview-title-selected');
            } else{
                selectRaceVariant.removeClass('listview-title-selected');
            }
        });
        modalRaceVariant.addClass('modal-top');
    });

    // Выбор предыстории
    optionBackground.click(function() {
        fillModalBackgrounds();
        modalBackground.find('.listview-item').each(function() {
            var selectBackground = $(this).find('.listview-title');
            if (selectBackground.attr('dnd-data') == optionBackgroundSpan.attr('dnd-data')){
                selectBackground.addClass('listview-title-selected');
            } else{
                selectBackground.removeClass('listview-title-selected');
            }
        });
        modalBackground.addClass('modal-top');
    });

    // Выбор базового класса
    optionClassBase.click(function() {
        fillModalClassBase();
        modalClassBase.find('.listview-item').each(function() {
            var selectClassBase = $(this).find('.listview-title');
            if (selectClassBase.attr('dnd-data') == optionClassBaseSpan.attr('dnd-data')){
                selectClassBase.addClass('listview-title-selected');
            } else{
                selectClassBase.removeClass('listview-title-selected');
            }
        });
        modalClassBase.addClass('modal-top');
    });

    // Выбор начальных характеристик
    optionAbilitiesBase.click(function() {
        fillModalAbilitiesBase();
        modalAbilitiesBase.addClass('modal-top');
    });

    // Выбор начальных характеристик
    optionSkillsBase.click(function() {
        fillModaloptionSkillsBase();
        modalSkillsBase.addClass('modal-top');
    });

    // Выбор базового фита от расы
    optionFeatBase.click(function() {
        fillModalFeatBase();
        modalFeatBase.find('.listview-item').each(function() {
            var selectFeatBase = $(this).find('.listview-title');
            if (selectFeatBase.attr('dnd-data') == optionFeatBaseSpan.attr('dnd-data')){
                selectFeatBase.addClass('listview-title-selected');
            } else{
                selectFeatBase.removeClass('listview-title-selected');
            }
        });
        modalFeatBase.addClass('modal-top');
    });
});