# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


$ ->

  generate_x_match_form = (column_names, id)->
    $("#config").append("<h3>Add a cross match</h3>
                        <form accept-charset='UTF-8' action=\"/datasets/#{id}/add\" enctype='multipart/form-data' method='post'>
                        </form>")
    $("#config form").append($(set_x_matches column_names, 1))
    $("#config form").append($(set_x_matches column_names, 2))
    $("#config form").append($("<input type='text' name='name' /><input name='commit' type='submit' value='Add'>"))

  append_dataset_column = (column_name)->
    radio = $("<input type=\"radio\" name=\"column_name\" id=\"#{column_name}\" value=\"#{column_name}\" />")
    label = $("<label for=\"#{column_name}\"> #{column_name}</label>")
    item = $("<li></li>").append(radio).append(label)
    $('#config ul').append(item)
    
  set_x_matches = (column_names, num)->
    select = "<div id=\"x_matcher_#{num}\"><select name=\"matcher-#{num}\">"
    select += "<option value=#{column}>#{column}</option>" for column in column_names
    select += "</select></div>"

  # $('#datasets a').click (e)->
  #   e.preventDefault()
  #   id = $(this).attr('data')
  #   $.getJSON "/datasets/#{id}", (data, status)->
  #     console.log(data)
  #     $('#config ul').html('')
  #     append_dataset_column column for column in data.column_names
  #     generate_x_match_form data.column_names, id
