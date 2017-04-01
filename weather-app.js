

/*  current_temp:66,
  dayhigh:96,daylow:76,
  nighthigh:46,nightlow:20
}
 document.getElementById("currenttemp").textContent=weather.current_temp
 document.getElementById("dayhigh").textContent=weather.dayhigh
 document.getElementById("daylow").textContent=weather.daylow
 document.getElementById("nighthigh").textContent=weather.nighthigh
 document.getElementById("nightlow").textContent=weather.nightlow*/
 let button = document.getElementById("units-button")
 button.addEventListener("click", function(){ click_button(true) })

 function get_temperatures(do_something){
   let ctemprequest = new XMLHttpRequest()
   ctemprequest.open("get", "http://api.wunderground.com/api/a07415328ca83d66/conditions/q/ny/queens.json")
   ctemprequest.send()

   let htemprequest = new XMLHttpRequest()
   htemprequest.open("get", "http://api.wunderground.com/api/a07415328ca83d66/hourly/q/ny/queens.json")
   htemprequest.send()

    function process_data(){
      let cur_temp = JSON.parse(ctemprequest.responseText)
      let h_temp = JSON.parse(htemprequest.responseText)

      do_something({
        current_temp_c: cur_temp.current_observation.temp_c,
        current_temp_f: cur_temp.current_observation.temp_f,

        hour_8_temp_c: h_temp.hourly_forecast[8].temp.metric,
        hour_16_temp_c: h_temp.hourly_forecast[16].temp.metric,

        hour_8_temp_f: h_temp.hourly_forecast[8].temp.english,
        hour_16_temp_f: h_temp.hourly_forecast[16].temp.english,

        time: cur_temp.current_observation.observation_time_rfc822
      })
   }

   let ctemprequest_completed = false
   let htemprequest_completed = false

   ctemprequest.addEventListener("load",function(){
     ctemprequest_completed = true
     if(htemprequest_completed == true){ process_data() }
   })

   htemprequest.addEventListener("load",function(){
     htemprequest_completed = true
     if(ctemprequest_completed == true){ process_data() }
   })
 }

 function click_button(celsius){
   get_temperatures(function(temperatures){
      if(celsius == true){
        document.getElementById("curtempdegree").textContent = temperatures.current_temp_c
        document.getElementById("next8degree").textContent= temperatures.hour_8_temp_c
        document.getElementById("next16degree").textContent= temperatures.hour_16_temp_c
        document.getElementById("date").textContent= temperature.time
      } else {
        document.getElementById("curtempdegree").textContent = temperatures.current_temp_f
        document.getElementById("next8degree").textContent= temperatures.hour_8_temp_f
        document.getElementById("next16degree").textContent= temperatures.hour_16_temp_f
        document.getElementById("date").textContent= temperature.time
      }
   })
 }


click_button(false)
