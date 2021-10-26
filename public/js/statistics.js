(function ( $ ) {
    $.fn.loadArchive = function(options) {

        var silent = false;

        $(document).keydown(function(event) {
            if (event.which == "17")
                silent = true;
        });

        $(document).keyup(function() {
            silent = false;
        });

        var archiveDiv = $(this);
        var imagesExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        var table = archiveDiv.find('#data_table').DataTable({
            processing: true,
            serverSide: true,
            scrollX: true,
            stateSave: false,
            rowId: 'id',
            lengthChange: options.showEntries,
            info: options.info,
            paging: options.paging,

            "ajax": {
                "url": options.url.replace('#id', options.archiveId),
                "dataSrc": "data.data"
            },
            "columns": [
                { "data": "id", "name": "id"},
                { "data": "title", "name": "title",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                        var color = '';
                        if(!(oData.flags&0x02)){
                            color = 'darkred';
                        }

                        var icon = "";
                        var link = "";
                        switch(oData.type) {
                            case 0:
                                icon = "<i class='icon-folder archive-icon' style='color:"+color+"'></i> ";
                                link = "<a title='"+oData.en_title+"' class='archive_link' id='"+oData.id+"' href='javascript:void(0)'>"+oData.title+"</a>";
                                break;
                            case 1:
                                icon = "<i class='icon-file-text archive-icon' style='color:"+color+"'></i> ";
                                link = "<a title='"+oData.en_title+"' class='page_link' id='"+oData.id+"' href='javascript:void(0)'>"+oData.title+"</a>";
                                break;
                            case 2:
                                icon = "<i class='icon-file-empty archive-icon' style='color:"+color+"'></i> ";
                                if(imagesExtension.indexOf(oData.extension)>=0) {
                                    icon = "<img src='"+options.downloadFileUrl.replace('#sid', oData.sid)+"' height='30px'>&nbsp;&nbsp;";
                                }
                                link = "<a target='_blank' title='"+oData.en_title+"' href='"+options.downloadFileUrl.replace('#sid', oData.sid)+"'>";
                                link += (oData.extension)?oData.title+"."+oData.extension:oData.title;
                                link += "</a>";
                                break;
                        }

                        var opacity = 0.2;
                        if(oData.flags&0x01){
                            opacity = 1;
                        }

                        var html = "<div style='display:inline-block; opacity:"+opacity+";'>"+icon+"</div><div style='display:inline-block'>"+link+"</div>";

                        if(oData.short_name) html += "&nbsp;<div style='display:inline-block'>(<B><I>"+oData.short_name+"</I></B>)</div>";
                        if($('#search_type').val()==1 && oData.path.length>0)html += "&nbsp;<div style='display:inline-block'><a class='archive_link' id='"+oData.parent_id+"' href='"+options.url.replace('#id', oData.parent_id)+"' style='font-size:75%;color:gray;'>("+oData.path+")</a></div>";

                        $(nTd).html(html);
                    }
                },

                { "data": "users", "name": "users",
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                    var users="";
                    oData.users.forEach(function(entry) {
                        users+=entry.name+",";
                    });
                    users = users.slice(0, -1)
                    $(nTd).html(users);

                }

                },
                { "data": "access_count", "name": "access_count"},
                
            ],
            rowReorder: {
                dataSrc: 'id',
            },
            "searchCols": [
                { "search": options.archiveId },
            ],
            drawCallback: function( settings, json ) {

                if(options.updateBrowserUrl) {
                    var url = options.url.replace('#id', options.archiveId);
                    $('#language-url').attr('href', url.replace(options.languageFrom,options.languageTo));
                    window.history.pushState("Archive", "Archive", url);
                }

                $.get(options.parentsUrl.replace('#id', options.archiveId).replace('#root_id', options.rootArchiveId), {}, function(data, textStatus, xhr) {

                    archiveDiv.find('#parents_ids').html("");

                    if(options.pathName.length>0 && data.length>1) {
                        archiveDiv.find('#parents_ids').append("&nbsp;/&nbsp;");
                    }

                    for(var i=0;i<data.length;i++) {
                        if(options.pathName.length>0 && data[i].id==options.rootArchiveId)
                            continue;                        
                        if(i<(data.length-1)) {
                            archiveDiv.find('#parents_ids').append("<div style='display:inline-block'><a title='"+data[i].en_title+"' class='archive_link' href='javascript:void(0)' id='"+data[i].id+"'>"+data[i].title+"</a></div>");
                            archiveDiv.find('#parents_ids').append("&nbsp;/&nbsp;");
                        } else {
                            archiveDiv.find('#parents_ids').append("<a title='"+data[i].en_title+"'>"+data[i].title+"</a>");
                        }                        
                    }

                    archiveDiv.find('.archive_link').on('click', function (event) {
                        event.preventDefault();
                        options.archiveId = $(this).attr('id');
                        archiveDiv.find('#reset_button').trigger('click');
                    });

                }, 'json');
            },
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                var orderColumn = this.fnSettings()?this.fnSettings().aaSorting[0][0]:0;

                if(orderColumn!=0) {
                    table.rowReorder.disable();
                } else {
                    table.rowReorder.enable();
                }
            }
        });


        $(".dataTables_filter").hide();

        archiveDiv.find('#search_button').on('click', function () {
            table.search(archiveDiv.find("#text_search").val());
            table.columns(0).search(options.archiveId);
            table.columns(1).search(archiveDiv.find("#search_type").val());
            table.columns(2).search(archiveDiv.find("#type").val());
            table.columns(3).search(archiveDiv.find("#content_type").val());
            table.draw();
        } );

        archiveDiv.find('#reset_button').on('click', function () {
            archiveDiv.find("#text_search").val("")
            archiveDiv.find("#type").val("");
            archiveDiv.find("#content_type").val("");
            archiveDiv.find("#search_type").val("");
            archiveDiv.find('#search_button').trigger('click');
        });

    }
}( jQuery ));
