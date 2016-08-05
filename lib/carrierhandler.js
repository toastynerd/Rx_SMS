module.exports = exports = function(number, cellProvider){
  let carrier = cellProvider.toUpperCase();
  if (carrier === 'AT&T' || carrier === 'ATT') return number + '@txt.att.net';
  if (carrier === 'VERIZON') return number + '@vtext.com';
  if (carrier === 'T-MOBILE' || carrier === 'TMOBILE') return number + '@tmomail.net';
  if (carrier === 'T-MOBILE' || carrier === 'TMOBILE') return number + '@tmomail.net';
  if (carrier === 'SPRINT') return number + '@pm.sprint.com';
  if (carrier === 'VIRGIN' || carrier === 'VIRGIN MOBILE') return number + '@vmobl.com';
  if (carrier === 'TRACFONE') return number + '@mmst5.tracfone.com';
  if (carrier === 'METRO PCS' || carrier === 'METROPCS' || carrier === 'METRO') return number + '@mymetropcs.com';
  if (carrier === 'BOOSTMOBILE' || carrier === 'BOOST MOBILE' || carrier === 'BOOST') return number + '@myboostmobile.com';
  if (carrier === 'CRICKET') return number + '@sms.mycricket.com';
  if (carrier === 'NEXTEL') return number + '@messaging.nextel.com';
  if (carrier === 'ALLTEL') return number + '@message.alltel.com';
  if (carrier === 'PTEL') return number + '@ptel.com';
  if (carrier === 'SUNCOM') return number + '@tms.suncom.com';
  if (carrier === 'QWEST') return number + '@qwestmp.com';
  if (carrier === 'US CELLULAR' || carrier === 'USCELLULAR' || carrier === 'U.S. CELLULAR') return number + '@email.uscc.net';
};
