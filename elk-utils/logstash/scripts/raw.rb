def register(params)
    @extras = ["guid", "unknown0", "currentHealth", "maxHealth", "attackPower", "spellPower", "unknown1", "powerType", "currentPower", "maxPower","unknown1", "posX", "posY","posZ","unknown2", "itemLevel"]

    @base = ["sourceGUID",	"sourceName",	"sourceFlags",	"sourceRaidFlags",	"destGUID",	"destName",	"destFlags",	"destRaidFlags"]

    @suffixes = {
                "_DAMAGE" => @extras + ["amount",	"overkill",	"school",	"resisted",	"blocked",	"absorbed",	"critical",	"glancing",	"crushing",	"isOffHand"],
                "_MISSED" => ["missType",	"isOffHand", "amountMissed"],
                "_HEAL" => @extras + ["amount",	"overhealing",	"absorbed",	"critical"],
                "_ENERGIZE" => @extras + ["amount",	"overEnergize",	"powerType",	"alternatePowerType"],
                "_DRAIN" => ["amount",	"powerType",	"extraAmount"],
                "_LEECH" => ["amount",	"powerType",	"extraAmount"],
                "_INTERRUPT" => ["extraSpellId",	"extraSpellName",	"extraSchool"],
                "_DISPEL" => ["extraSpellId",	"extraSpellName",	"extraSchool",	"auraType"],
                "_DISPEL_FAILED" => ["extraSpellId",	"extraSpellName",	"extraSchool"],
                "_STOLEN" => ["extraSpellId",	"extraSpellName", "extraSchool", "auraType"],
                "_EXTRA_ATTACKS" => ["amount"],
                "_AURA_APPLIED"	=> ["auraType",	"amount"],
                "_AURA_REMOVED"	=> ["auraType",	"amount"],
                "_AURA_APPLIED_DOSE" => ["auraType",	"amount"],
                "_AURA_REMOVED_DOSE" => ["auraType",	"amount"],
                "_AURA_REFRESH"	=> ["auraType",	"amount"],
                "_AURA_BROKEN" => ["auraType"],
                "_AURA_BROKEN_SPELL" => ["extraSpellId",	"extraSpellName",	"extraSchool",	"auraType"],
                "_CAST_START" => [],
                "_CAST_SUCCESS" => @extras + [],
                "_CAST_FAILED" => ["failedType"],
                "_INSTAKILL" => [],
                "_DURABILITY_DAMAGE" => [],
                "_DURABILITY_DAMAGE_ALL" => [],
                "_CREATE" => [],
                "_SUMMON" => [],
                "_RESURRECT" => []
                }

    @prefixes = {
        "SWING" => [],
        "RANGE" => ["spellId", "spellName", "spellSchool"],
        "SPELL" => ["spellId", "spellName", "spellSchool"],
        "ENVIRONMENTAL" => ["environmentalType"],
        "PARTY_KILL" => [],
        "UNIT_DIED" => ["recapId",	"unconsciousOnDeath"],
        "UNIT_DESTROYED" =>	["recapId",	"unconsciousOnDeath"],
        "UNIT_DISSIPATES" => ["recapId",	"unconsciousOnDeath"],
        "DAMAGE_SHIELD" => ["spellId", "spellName", "spellSchool"],
        "DAMAGE_SPLIT" => ["spellId", "spellName", "spellSchool"],
        "DAMAGE_SHIELD_MISSED" => ["spellId", "spellName", "spellSchool"]
        }
    @skips = ["COMBAT_LOG_VERSION"]
end

def filter(event)


    rawEvent = event.get("rawevent")
    rawEvent = rawEvent.strip

    if(@skips.any? { |s| rawEvent.include?(s) })
        return []
    end

    rawArray = rawEvent.split(",")
    if !rawArray
        return []
    end
    
    action = rawArray.shift(1).first

    event.set("event",action)

    baseData = rawArray.shift(@base.length)
    if baseData.empty?
        return[]
    end

    baseHash = Hash[@base.zip(baseData)]
    baseHash.each {|key,val| event.set(key,val)}

    prefix = @prefixes.select{|key,value| action.include?(key)}.first

    actionBaseKeys = prefix[1]
    actionHash = Hash[actionBaseKeys.zip(rawArray.shift(actionBaseKeys.length))]
    actionHash.each {|key,val| event.set(key,val)}

    suffix = @suffixes.select{|key,value| action.include?(key)}.first

    if(suffix != nil)
        dataKeys = suffix[1]
        dataHash = Hash[dataKeys.zip(rawArray.shift(dataKeys.length))]
        dataHash.each {|key,val| event.set(key,val)}
    end
    
    
    return [event]

end