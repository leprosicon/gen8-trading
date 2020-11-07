// Constants
const BATTLE_STATS = ['Hit Points','Attack','Defense','Special Attack','Special Defense','Speed'];
const BATTLE_STATS_ABBR = ['HP','Atk','Def','SpA','SpD','Spe'];
const LANGUAGES = { 'JPN': 'Japanese', 'ENG': 'English', 'FRE': 'French', 'GER': 'German', 'ITA': 'Italian', 'KOR': 'Korean', 'SPA': 'Spanish', 'CHT': 'Traditional Chinese', 'CHS': 'Simplified Chinese'};
const POKE_BALL_HEADERS = {'Poké': '_dcgjs', 'Great': '_ddv49', 'Ultra': '_d415a', 'Master': '_d5fpr', 'Safari': '_d6ua4', 'Level': '_d88ul', 'Lure': '_dkvya', 'Moon': '_dmair', 'Friend': '_dnp34', 'Love': '_dp3nl', 'Heavy': '_df9om', 'Fast': '_dgo93', 'Sport': '_di2tg', 'Premier': '_djhdx', 'Repeat': '_dw4je', 'Timer': '_dxj3v', 'Nest': '_dyxo8', 'Net': '_e0c8p', 'Dive': '_dqi9q', 'Luxury': '_drwu7', 'Heal': '_dtbek', 'Quick': '_dupz1', 'Dusk': '_e7d2q', 'Cherish': '_e8rn7', 'Dream': '_ea67k', 'Beast': '_ebks1'};
const TAB_NAMES = { 'FT': 'For Trade', 'LF': 'Looking For', 'NFT': 'Not For Trade', '?': 'Other' };
const GENDER_RATIOS = { 'Female Only': 'gender-ratio-1-0', '7 ♀ : 1 ♂': 'gender-ratio-7-1', '3 ♀ : 1 ♂': 'gender-ratio-3-1', '1 ♀ : 1 ♂': 'gender-ratio-1-1', '1 ♀ : 3 ♂': 'gender-ratio-1-3', '1 ♀ : 7 ♂': 'gender-ratio-1-7', 'Male Only': 'gender-ratio-0-1', 'Genderless': 'gender-ratio-0-0' };
const EGG_GROUPS = ['Monster', 'Water 1', 'Bug', 'Flying', 'Field', 'Fairy', 'Grass', 'Human-Like', 'Water 3', 'Mineral', 'Amorphous', 'Water 2', 'Dragon', 'Undiscovered'];
// Classes
class StatAttributes {
    constructor(stats = [0, 0, 0, 0, 0, 0]) {
        [this.hp, this.atk, this.def, this.spa, this.spd, this.spe] = stats;
    }
}
// Functions
const camelToSnake = (str) => str.replace(/([A-Z])/g, (group) => '-' + group.toLowerCase());
const clickOutsideDropdownMenuListener = (e) => {
    $target = $(e.target);
    if (!$target.closest('.filter.active :not(label)').length) {
        $('.filter.active .dropdown-menu').parent().removeClass('active');
        document.removeEventListener('click', clickOutsideDropdownMenuListener);
    }
}
/**
 * Converts a number to a roman numeral.
 */
function toRoman(number) {
    const vals = [10, 9, 5, 4, 1];
    const syms = ['X', 'IX', 'V', 'IV', 'I'];
    roman = '';
    for (let i = 0; i < syms.length; i++) {
        while (number >= vals[i]) {
            number -= vals[i];
            roman += syms[i];
        }
    }
    return roman;
}

/**
 * Returns elements present in both arrays.
 */
function intersection(array1, array2) {
    return array1.filter( value => array2.includes(value) )
}

/**
 * Gets the URL of a specific sheet on a workbook
 */
function getWorksheetUrl(spreadsheetId, worksheetId) {
    return 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/' + worksheetId + '/public/values?alt=json';
}
/**
 * Gets the URL of a workbook
 */
function getSpreadsheetUrl(spreadsheetId) {
    return 'https://spreadsheets.google.com/feeds/worksheets/' + spreadsheetId + '/public/basic?alt=json';
}

function getDataAttr(pokemon) {
    var data = '';
    Object.keys(pokemon).forEach(function(i) {
        if (pokemon[i] && typeof pokemon[i] !== 'function') {
            if (typeof pokemon[i] !== 'object') {
                data += ' data-' + camelToSnake(i) + '="' + pokemon[i] + '"';
            }
        }
    });
    data += ' data-poke-ball="';
    for (var i = 0; i < pokemon.pokeBalls.length; i++) {
        data += slugify(pokemon.pokeBalls[i]) + ',';
    }
    data = data.slice(0, -1) + '"';
    return data;
}

function slugify(name, form=undefined) {
    var slug = name
    if (form) {
        switch (form) {
            case 'Original Cap':
            case 'Hoenn Cap':
            case 'Sinnoh Cap':
            case 'Unova Cap':
            case 'Kalos Cap':
            case 'Alola Cap':
            case 'Partner Cap':
            case 'Normal Forme':
            case 'Plant Cloak':
            case 'West Sea':
            case 'Rotom':
            case 'Altered Forme':
            case 'Land Forme':
            case 'Red-Striped Form':
            case 'Spring Form':
            case 'Incarnate Forme':
            case 'Ordinary Form':
            case 'Meadow Pattern':
            case 'Red Flower':
            case 'Natural Form':
            case 'Average Size':
            case 'Small Size':
            case 'Large Size':
            case 'Super Size':
            case '50% Forme':
            case 'Hoopa Confined':
            case 'Baile Style':
            case 'Midday Form':
            case 'Meteor Form':
            case 'Single Strike Style':
                // These forms don't have a different sprite
                break;
            case 'Alolan Form':
                slug += '-alola';
                break;
            case 'Galarian Form':
                slug += '-galar';
                break;
            case 'Rapid Strike Style':
                slug += '-rapid-strike';
                break;
            case 'Dusk Mane':
            case 'Dawn Wings':
            case 'Vanilla Cream':
            case 'Ruby Cream':
            case 'Matcha Cream':
            case 'Mint Cream':
            case 'Lemon Cream':
            case 'Salted Cream':
            case 'Ruby Swirl':
            case 'Caramel Swirl':
            case 'Rainbow Swirl':
                slug += '-' + form.replace(' ', '-');
                break;
            default:
                slug += '-' + form.substring(0, form.lastIndexOf(' '));
                break;
        }
    }
    return slug.toLowerCase().replace('é', 'e').replace(/[.:'’%]/g, '').replace(' ', '-');
}
/**
 * Tries to return a value from the given row based on a list of whitelisted column names.
 */
function tryGetValue(row, whitelist, defaultValue=undefined) {
    for (let i = 0; i < whitelist.length; i++) {
        var col = 'gsx$' + whitelist[i].toLowerCase();
        if (row[col] && row[col].$t) return row[col].$t;
    }
    return defaultValue;
}
/**
 * Handles the 'change' event on checkboxes.
 */
function changeCheckbox() {
    var $this = $(this);
    var isRadio = $this.attr('type') == 'radio';
    var name = $this.attr('name');
    var $button = $('#' + name + '-filter');
    if (isRadio) {
        // Mark all others unchecked
        $('input[name="' + name + '"]:not([value="' + $this.val() + '"])').each(function() {
            $(this).prop('checked', false).parent().removeClass('active');
        });
    }
    if (this.checked) {
        $this.parent().addClass('active');
        if ($this.val() == 'all') {
            // Select all
            $('input[name="' + name + '"]:not([value="all"])').each(function () {
                $(this).prop('checked', true).parent().addClass('active');
            });
        }
    } else {
        $this.parent().removeClass('active');
        if ($this.val() == 'all') {
            // Unselect all
            $('input[name="' + name + '"]:not([value="all"])').each(function () {
                $(this).prop('checked', false).parent().removeClass('active');
            });
        } else if (!isRadio) {
            // Mark 'Select All' as unchecked
            $('input[name="' + name + '"][value="all"]').prop('checked', false).parent().removeClass('active');
        }
    }
    // Mark 'Select All' as checked if all checked
    var options = $('input[name="' + name + '"]:not([value="all"])').length;
    var $checked = $('input[name="' + name + '"]:not([value="all"]):checked');
    if (options == $checked.length) {
        $('input[name="' + name + '"][value="all"]').prop('checked', true).parent().addClass('active');
        $button.text('All selected');
    } else {
        if ($checked.length == 0) {
            $button.text('None Selected');
        } else if ($checked.length == 1) {
            $button.text($('label[for="' + $checked.attr('id') + '"]').text());
        } else {
            $button.text($checked.length + ' Selected');
        }
    }
    // Do the thing
    if (name == 'markdown') {
        $('#markdown').removeClass('hidden');
        toggleCols();
    } else {
        filterPokemon();
    }
}
/**
 * Handles the 'click' event on the dropdown menu button.
 */
function deployDropdown() {
    var $parent = $(this).parent();
    if ($parent.hasClass('disabled')) {
        return;
    }
    var hasClass = $parent.hasClass('active');
    $('.filter').each(function() {
        $(this).removeClass('active');
    });
    if (hasClass) {
        $parent.removeClass('active');
    } else {
        $parent.addClass('active');
        document.addEventListener('click', clickOutsideDropdownMenuListener);
    }
}
/**
 * Creates a checkbox used for filtering Pokémon.
 */
function createCheckbox(type, name, value, checked=true, isRadio=false) {
    var $li = $('<li></li>')
        .attr('class', checked ? 'active' : '');
    $('<label></label>')
        .attr('for', 'filter-' + type + '-' + value)
        .text(name)
        .appendTo($li);
    $('<input />')
        .attr('id', 'filter-' + type + '-' + value)
        .attr('name', type)
        .attr('value', value)
        .prop('checked', checked)
        .attr('type', isRadio ? 'radio' : 'checkbox')
        .change(changeCheckbox)
        .appendTo($li);
    return $li;
}
/**
 * Creates a filter.
 */
function createFilter(destination, type, name, inclSelectAll=true) {
    var $dropdown = $('<ol></ol>')
        .addClass('dropdown-menu');
    if (inclSelectAll) {
        $dropdown.append(createCheckbox(type, 'Select all', 'all'));
    }
    var $div = $('<div></div>')
        .attr('data-type', type)
        .addClass('filter');
    $('<label></gpabel>')
        .attr('for', type + '-filter')
        .text(name)
        .appendTo($div);
    $('<button></button>')
        .attr('id', type + '-filter')
        .text('All Selected')
        .click(deployDropdown)
        .appendTo($div);
    $div.append($dropdown);
    $(destination).prepend($div);
    return $dropdown;
}
/**
 * Hides/shows columns that are active
 */
function filterPokemon() {
    $('tbody tr').addClass( 'filtered' );
    // get selected generations
    var gens = []; var i = 0;
    $('#gen-filter + .dropdown-menu .active input:not([value="all"])').each(function() {
        gens[i++] = $(this).val();
    });
    var eggGroups = []; var i = 0;
    $('#egg-group-filter + .dropdown-menu .active input:not([value="all"])').each(function() {
        eggGroups[i++] = $(this).val();
    });
    var genderRatios = []; var i = 0;
    $('#gender-ratio-filter + .dropdown-menu .active input:not([value="all"])').each(function() {
        genderRatios[i++] = $(this).val();
    });
    var pokeBalls = []; var i = 0;
    $('#poke-ball-filter + .dropdown-menu .active input:not([value="all"])').each(function() {
        pokeBalls[i++] = $(this).val() + '-ball';
    });
    $('tbody tr').each(function() {
        var $this = $(this);
        if (
            gens.includes($this.attr('data-gen')) &&
            genderRatios.includes($this.attr('data-gender-ratio')) &&
            ( intersection( pokeBalls, $this.attr('data-poke-ball').split(',') ).length > 0 ) &&
            ( intersection( eggGroups, $this.attr('data-egg-group').split(',') ).length > 0 )
        ) {
            $this.removeClass('filtered');
        } else {
            $this.addClass('filtered');
        }
    });
}
/**
 * Hides/shows columns that are active
 */
function toggleCols() {
    $( '.line span' ).removeClass( 'hidden' );
    // get active columns that are not disabled
    var cols = []; var i = 0;
    $( '#copy2reddit .dropdown-menu li.active input' ).each(function() {
        cols[i++] = '.' + $(this).val();
    });
    $('.line span:not(.name)').each(function() {
        var $this = $(this);
        if (!$this.is(cols.join(','))) $this.addClass('hidden');
    });
}
/**
 * Displays the trainer info
 */
function displayTrainerInfo(inGameName, friendCode, contactUrl) {
    $('title').text(inGameName + '\'s Pokémon Trading Sheet');
    $('header h1 a').text(inGameName).attr('href', contactUrl);
    if (friendCode || inGameName) {
        var trainerInfo = '<dl>';
        if (inGameName) {
            trainerInfo += '<dt><abbr title="In-Game Name">IGN</abbr></dt>';
            trainerInfo += '<dd>' + inGameName + '</dd>';
        }
        if (friendCode) {
            trainerInfo += '<dt><abbr title="Friend Code">FC</abbr></dt>';
            trainerInfo += '<dd>' + friendCode + '</dd>';
        }
        trainerInfo += '</dl>';
        $('header').append(trainerInfo);
    }
}
/**
 * Displays the Pokémon data
 */
function loadPokemon(pokemonData) {
    $.getJSON(getWorksheetUrl(spreadsheetId, worksheetId), function(spreadsheet) {
        var rows = spreadsheet.feed.entry;
        var count = 0;
        $(rows).each(function() {
            // Get data from row and store in `pokemon` object
            var pokemon = {};
            pokemon.name = tryGetValue(this, ['name']);
            pokemon.form = tryGetValue(this, ['form']);
            var slug = slugify(pokemon.name, pokemon.form);
            if (!(slug in pokemonData)) {
                return true;
            }
            pokemon.eggGroup = pokemonData[slug].egg.join(',');
            pokemon.gen = pokemonData[slug].gen;
            pokemon.genderRatio = 'gender-ratio-' + pokemonData[slug].gr;
            pokemon.nature = tryGetValue(this, ['nature'], '???');
            pokemon.gender = tryGetValue(this, ['sex', 'gender']);
            switch (pokemon.genderRatio) {
                case 'gender-ratio-1-0':
                    gender = 'F';
                    break;
                case 'gender-ratio-0-1':
                    gender = 'M';
                    break;
                case 'gender-ratio-0-0':
                    gender = '-';
                    break;
            }
            pokemon.ability = tryGetValue(this, ['ability'], 'Any');
            if (pokemon.ability == pokemonData[slug].abs[2]) {
                pokemon.hasHiddenAbility = true;
            }
//            pokemon.ivs = new StatAttributes([tryGetValue(this, ['hpiv'], 'x'), tryGetValue(this, ['atkiv'], 'x'), tryGetValue(this, ['defiv'], 'x'), tryGetValue(this, ['spaiv'], 'x'), tryGetValue(this, ['spdiv'], 'x'), tryGetValue(this, ['speiv'], 'x')]);
//            pokemon.evs = new StatAttributes([tryGetValue(this, ['hpev']), tryGetValue(this, ['atkev']), tryGetValue(this, ['defev']), tryGetValue(this, ['spaev']), tryGetValue(this, ['spdev']), tryGetValue(this, ['speev'])]);
            pokemon.moves = [
                tryGetValue(this, ['move1']),
                tryGetValue(this, ['move2']),
                tryGetValue(this, ['move3']),
                tryGetValue(this, ['move4'])
                ].filter(function(e){return e;});
            pokemon.eggMoves = [
                tryGetValue(this, ['eggmove1', 'relearnmove1']),
                tryGetValue(this, ['eggmove2', 'relearnmove2']),
                tryGetValue(this, ['eggmove3', 'relearnmove3']),
                tryGetValue(this, ['eggmove4', 'relearnmove4'])
                ].filter(function(e){return e;});
            pokemon.isShiny = tryGetValue(this, ['shiny', 'isshiny']);
            pokemon.nickname = tryGetValue(this, ['nickname']);
            pokemon.ot = tryGetValue(this, ['ot']);
            pokemon.tid = tryGetValue(this, ['tid']);
            pokemon.level = tryGetValue(this, ['level', 'lvl', 'lv']);
            pokemon.language = tryGetValue(this, ['language', 'lang']);
            pokemon.notes = tryGetValue(this, ['note', 'notes', 'comment', 'comments']);
            // Poké Balls
            pokemon.pokeBalls = [];
            for (let pokeBall of Object.keys(POKE_BALL_HEADERS)) {
                var value = tryGetValue(this, [pokeBall, pokeBall+'ball', pokeBall.replace(/é/g, 'e'), pokeBall.replace(/é/g, 'e')+'ball', POKE_BALL_HEADERS[pokeBall]]);
                if (value) {
                    if (isForUniquePokemon) {
                        pokemon.pokeBalls.push(value);
                    } else {
                        pokemon.pokeBalls.push(pokeBall + ' Ball');
                    }
                }
            }
            // Create an HTML row
            var row = '<tr data-pokemon="' + slug + '" data-id="' + count + '"' + getDataAttr(pokemon) + '>';
            // Sprite
            row += '<td class="sprite"><span class="ms" title="' + pokemon.name + '">' + pokemon.name + '</span></td>';
            // Name
            row += '<td class="name">' + pokemon.name;
            if (pokemon.gender == 'F') {
                 row += ' <span class="gender" title="Female">&#x2640;</span>';
            } else if (pokemon.gender == 'M') {
                 row += ' <span class="gender" title="Male">&#x2642;</span>';
            }
            if (pokemon.form) {
                row += '<br><span class="form">' + pokemon.form + '</span>';
            }
            row += '</td>';
            // Trainer
            row += '<td class="trainer">' + pokemon.ot + '<br><span class="tid">(' + pokemon.tid + ")</span></td>";
            // Nature
            row += '<td class="nature">' + pokemon.nature + '</td>';
            // Ability
            row += '<td class="ability">' + (pokemon.ability.endsWith('*') ? pokemon.ability.slice(0,-1) : pokemon.ability) + '</td>';
            // EVs
            var evs = [];
            var evTotal = 0;
            for (var i = 0; i < BATTLE_STATS.length; i++) {
                var stat = BATTLE_STATS_ABBR[i];
                var ev = Number(pokemon.evs[stat.toLowerCase()]);
                if (ev > 0) {
                    evTotal += ev;
                    evs.push('<abbr title="' + stat + ' EV">' + ev + ' ' + stat + '</abbr>');
                }
            }
            // IVs
//            var ivs = [];
 //           for (var i = 0; i < BATTLE_STATS.length; i++) {
//                var stat = BATTLE_STATS_ABBR[i];
//                var iv = pokemon.ivs[stat.toLowerCase()];
 //               var legend = '';
                // Format hyper trained, even, or odd IVs
 //               if (isNaN(iv)) {
 //                   if (iv.endsWith('*')) {
  //                      legend = 'Hyper trained ' + stat + ' IV! This originally was ' + iv.slice(0, -1) + '.';
 //                       iv = 'HT';
 //                   } else {
 //                       switch (iv.toLowerCase()) {
//                            case '2x':
 //                           case 'e':
 //                           case 'even':
   //                             legend = 'Even ' + stat + ' IV';
 //                               break;
     //                       case '2x+1':
       //                     case 'o':
         //                   case 'odd':
           //                     legend = 'Odd ' + stat + ' IV';
             //                   break;
               //             case 'vg':
                 //           case 'very good':
                   //             legend = 'Very Good (26-29) ' + stat + ' IV';
//                                break;
  //                          case 'pg':
    //                        case 'pretty good':
      //                          legend = 'Pretty Good (16-25) ' + stat + ' IV';
        //                        break;
          //                  case 'd':
            //                case 'decent':
              //                  legend = 'Decent (1-15) ' + stat + ' IV';
//                                break;
  //                          case 'ht':
    //                            legend = 'Hyper trained ' + stat + ' IV!';
      //                          break;
        //                }
          //          }
  //              }
    //            if (!legend) legend = stat + ' IV';
      //          iv = '<abbr class="' + stat.toLowerCase() + ' title="' + legend + '">' + iv + '</abbr>';
        //        ivs.push(iv);
          //      row += '<td class="' + stat.toLowerCase() + (evTotal > 0 ? ' rows2' : '') + '">' + iv;
                // If Pokémon is EV trained, break line and display EVs
   //             if (evTotal > 0) {
     //               row += '<br>';
       //             var ev = Number(pokemon.evs[stat.toLowerCase()]);
         //           if (ev > 0) {
           //             row += '<abbr title="' + stat + ' EV">' + ev + '</abbr>';
             //       } else {
               //         row += '-';
  //                  }
    //            }
      //          row += '</abbr>';
        //    }
//            ivs = ivs.join('/');
  //          evs = evs.join(' / ');
    //        if (evTotal === 0) evs = 'Not EV-trained';
      //      row += '<td class="ivs hidden">' + ivs + '</td>';
        //    row += '<td class="evs hidden">' + evs + '</td>';
            // Moves
            row += '<td class="moves' +  (pokemon.eggMoves.length > 0 || !isForUniquePokemon ? ' hidden' : '') + '">' + pokemon.moves.join(', ') + '</td>';      
            row += '<td class="egg-moves' +  (pokemon.eggMoves.length === 0 && isForUniquePokemon ? ' hidden' : '') + '">' + pokemon.eggMoves.join(', ') + '</td>'; 
            // Poké Balls
            row += '<td class="poke-balls rows' + Math.ceil(pokemon.pokeBalls.length / 3) + '">';
            for (var i = 0; i < pokemon.pokeBalls.length; i++) {
                row += '<span title="' + pokemon.pokeBalls[i] + '"';
                row += ' class="item-sprite ' + slugify(pokemon.pokeBalls[i]);
                row += ' row' + Math.ceil((i + 1)/ 3) + '">';
                row += pokemon.pokeBalls[i] + '</span>';
            }
            row += '</td></tr>';
            $('tbody').append(row);
            count++;
        });
        // Remove loading screen
        $('#loader').fadeOut('slow');
        // Animate Pokémon on hover
        var handle = 0;
        $('tbody tr').hover(function() {
            var $pkmn = $(this).find('.sprite');
            handle = setInterval(function() {
                $pkmn.toggleClass('up');
            }, 150);
        }, function() {
            $(this).find('.sprite').removeClass('up');
            clearInterval(handle);
        });
        // Add/Remove Pokémon to Reddit table
        
        $('tbody tr').click(function() {
            var $this = $(this);
            if ($this.hasClass('selected')) {
                $this.attr('title', 'Click to ' + (isForUniquePokemon ? 'display more information and ' : '') + 'add to Reddit table.');
            } else {
                $this.attr('title', 'Click to remove from Reddit table.');
            }
            $this.toggleClass('selected');
            var id = $this.data('id');
            var $markdown = $('#markdown');
            var $line = $markdown.find('.line[data-id=\'' + id + '\']');
            // Remove Pokémon from table if it exists
            if ($line.length > 0) {
                $line.remove();
            }
            // Add to table if it doesn't
            else {
                var line = "";
                // Pokémon Name
                var name = $this.data('name');
                if ($this.data('isshiny')) name = '★ ' + name;
                var gender = $this.data('gender');
                if (gender == 'F') {
                    name += ' ♀';
                } else if (gender == 'M') {
                    name += ' ♂';
                }
                var nickname = $this.data('nickname');
                if (nickname) {
                    name = nickname + " (' + name + ')";
                }
                line += '<span class="name">| ' + name + ' |</span>';
                // Trainer
                line += '<span class="trainer"> ' + $this.data('ot') + ' (' + $this.data('tid') + ') |</span>';
                // Nature & Ability
                line += '<span class="nature"> ' + $this.data('nature') + ' |</span>';
                var ability = $this.data('ability');
                ability = ability.endsWith('*') ? ability.slice(0,-1) : ability;
                if ($this.hasClass('hidden-ability')) {
                    ability = '**' + ability + '**';
                }
                line += '<span class="ability"> ' + ability + ' |</span>';
                // IVs & EVs
   //             var statAttributes = $this.find( '.ivs' ).text();
  //              line += '<span class="ivs"> ' + statAttributes + ' |</span>';
  //              statAttributes = $this.find( '.evs' ).text();
  //              line += '<span class="evs"> ' + statAttributes + ' |</span>';
                // Egg Moves
                line += '<span class="egg-moves"> ' + $this.find( '.egg-moves' ).text() + ' |</span>';
                // Poké Balls
                line += '<span class="poke-balls">';
                $this.find( '.item-sprite' ).each(function() {
                    line += ' ' + $(this).text() + ',';
                });
                line = line.slice(0, -1);
                line += ' |</span>';
                // Language
                line += '<span class="language"> ' + $this.data( 'language' ) + ' |</span>';
                // Notes
                line += '<span class="notes"> ' + $this.data( 'notes' ) + ' |</span>';
                // Add line
                line = '<span class="line" data-id="' + id + '">' + line + '<br></span>';
                $markdown.append(line);
                toggleCols();
            }
        });

        if (isForUniquePokemon) {
            $( 'th.ivs' ).append(' / <abbr title="Effort Values">EVs</abbr>');
            $( 'th.egg-moves' ).text( 'Moves' );
        } else {
            $( 'table .trainer' ).addClass( 'hidden' );
        }
        
        // Create filters
        $dropdown = createFilter('nav', 'egg-group', 'Egg Group');
        for (let i = 0; i < EGG_GROUPS.length; i++) {
            $dropdown.append(createCheckbox('egg-group', EGG_GROUPS[i], EGG_GROUPS[i].toLowerCase().replace(' ', '').replace('-', '') ));
        }
        $dropdown = createFilter('nav', 'gender-ratio', 'Gender Ratio');
        for (let genderRatio of Object.keys(GENDER_RATIOS)) {
            $dropdown.append(createCheckbox('gender-ratio', genderRatio, GENDER_RATIOS[genderRatio]));
        }
        $dropdown = createFilter('nav', 'poke-ball', 'Poké Ball');
        for (let pokeBall of Object.keys(POKE_BALL_HEADERS)) {
            $dropdown.append(createCheckbox('poke-ball', pokeBall + ' Ball', slugify(pokeBall)));
        }
        $dropdown = createFilter('nav', 'gen', 'Generation');
        for (let i = 1; i <= 8; i++) {
            $dropdown.append(createCheckbox('gen', 'Generation ' + toRoman(i), i));
        }
        // Category
        $dropdown = createFilter('#copy2reddit', 'markdown', 'Select columns to generate a Reddit Table');
        if (isForUniquePokemon) $dropdown.append(createCheckbox('markdown', 'OT/TID', 'trainer', false));
        $dropdown.append(createCheckbox('markdown', 'Nature', 'nature', false));
        $dropdown.append(createCheckbox('markdown', 'Ability', 'ability', false));
        $dropdown.append(createCheckbox('markdown', 'IVs', 'ivs', false));
        if (isForUniquePokemon) $dropdown.append(createCheckbox('markdown', 'EVs', 'evs', false));
        $dropdown.append(createCheckbox('markdown', 'Egg Moves', 'egg-moves', false));
        $dropdown.append(createCheckbox('markdown', 'Poké Ball(s)', 'poke-balls', false));
        if (isForUniquePokemon) $dropdown.append(createCheckbox('markdown', 'Language', 'language', false));
        if (isForUniquePokemon) $dropdown.append(createCheckbox('markdown', 'Notes', 'notes', false));
        $dropdown.find('.active').removeClass('active').find('input').prop('checked', false);
        $('#markdown-filter').text('None Selected');
    });
}

// Default values for config stuff
var spreadsheetId = window.location.search.substring(1) || SpreadsheetConfig.id;
var worksheetId = 1;
var isForUniquePokemon = false;

$(document).ready(function() {
    $.getJSON(getWorksheetUrl(spreadsheetId, 1), function(data) {
        // Read config worksheet if exists
        var entry = data.feed.entry[0];
        if (entry.gsx$ingamename) {
            friendCode = tryGetValue(entry, ['friendcode'], SpreadsheetConfig.friendCode);
            inGameName = tryGetValue(entry, ['ingamename'], SpreadsheetConfig.inGameName);
            contactUrl = tryGetValue(entry, ['contacturl'], SpreadsheetConfig.contactUrl);
            worksheetId = 2;
            displayTrainerInfo(inGameName, friendCode, contactUrl)
        }
        // Get worksheet from URL, otherwise it defaults to 1st sheet
        var hash = window.location.hash.slice(-1);
        if (!isNaN(hash) && hash) {
            worksheetId = hash;
        }
        $.getJSON('https://plan.pokemonteams.io/static/pokemon.json', pokemonData => loadPokemon(pokemonData));
    });
});
