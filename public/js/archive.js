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

        var markedIds = [];
        function resetMarks() {
            markedIds = [];
            $('#archive_marks').hide();
            $('#archive_move').hide();
            $('#archive_paste').hide();
            $('#reset_marks').hide();
            $('#marks_divider').hide();
        }

        $("input[data-remote]").dataRemote();

        archiveDiv.find("#toggle_search").on('click', function() {
            if($(this).attr('show')=="yes") {
                $(this).html("Search Bar");
                $(this).attr('show','no');
                archiveDiv.find('#search_bar').css('display','none');
            } else {
                $(this).html("Search Bar <i class='icon-done archive-icon'></i>");
                $(this).attr('show','yes');
                archiveDiv.find('#search_bar').css('display','');
            }
        });

        var newItemAdded = false;

        archiveDiv.find("#upload_files").uploadFiles({
                token: options.token,
                progressBar: archiveDiv.find('#progress_bar'),
                progressText: archiveDiv.find('#progress_text'),
            },
            function(data) {
                newItemAdded = true;
                archiveDiv.find('#reset_button').trigger('click');
            }, function(response){
                showRepsonseErrors(response);
            });

        archiveDiv.find(".upload_type_file").uploadFiles({
                token: options.token,
                progressBar: archiveDiv.find('#progress_bar'),
                progressText: archiveDiv.find('#progress_text'),
            },
            function(data) {
                newItemAdded = true;
                archiveDiv.find('#reset_button').trigger('click');
            }, function(response){
                showRepsonseErrors(response);
            });

        function addArchive(type, title, done) {
            var action = options.saveUrl.replace('#id', 0);
            var modal = $('#edit_folder_modal').first();
            modal.find('.modal-title').text(title);
            modal.find('form').attr('action', action);
            modal.find("form :input[name='type']").val(type);
            modal.find("form :input[name='parent_id']").val(options.archiveId);
            modal.find("form :input[name='title']").val("");
            modal.find("form :input[name='sub_title']").val("");
            modal.find("form :input[name='description']").val("");
            modal.find("form :input[name='content_type']").val("");
            modal.find("form :input[name='short_name']").val("");
            modal.find("form :input[name='users_ids']").val("");
            modal.find("form :input[name='roles']").val("");
            modal.find("form :input[name='visible']").prop('checked', true);
            modal.find("form :input[name='writable']").prop('checked', true);
            modal.execModal({}, function(response){
                if(done)done();
            }, null, function(modal){
                modal.find('#select-type').selectize();
                modal.find('#users_ids').initializeSelectize()
                modal.find('#roles').selectize();
            });
        }

        archiveDiv.find("#add_folder").on('click', function(){
            addArchive(0, 'Add Folder', function(){
                archiveDiv.find('#reset_button').trigger('click');
            });
        });

        archiveDiv.find("#add_page").on('click', function(){
            addArchive(1, 'Add Page', function(){
                newItemAdded = true;
                archiveDiv.find('#reset_button').trigger('click');
            });
        });

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
                { "data": "order", "name": "order", "className": "reorder"},
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
                { "data": "content_type", "name": "content_type",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(oData.content_type);
                        $(nTd).attr('content_type', oData.content_type);
                    }
                },
                { "data": "size", "name": "size",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        if(oData.type==0)
                            $(nTd).html("-");
                        else
                            $(nTd).html(fileSizeText(oData.size));
                    }
                },
                { "data": "updated_at", "name": "updated_at"},
                { "data": "id", "name": "id",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var html = "<span class='action-column'>";
                        if(!options.readOnly||options.isAdmin) {
                            if (oData.flags&0x2||options.isAdmin)
                                html += "<a title='Delete' class='delete_archive' href='javascript:void(0)'><i class='icon-delete'></i></a>&nbsp;";
                            if (oData.flags&0x2||options.isAdmin)
                                html += "<a title='Edit Info' class='edit_archive_info' href='javascript:void(0)'><i class='icon-edit'></i></a>&nbsp;";
                            if (options.isAdmin) {
                                var mark = "icon-checkmark2";
                                if(markedIds.indexOf(oData.id)>=0)
                                    mark = "icon-checkmark";
                                html += "<a title='Mark Item' class='mark_archive' href='javascript:void(0)'><i class='"+mark+"'></i></a>&nbsp;";
                            }
                            if(oData.type==1 && (oData.flags&0x2||options.isAdmin))
                                html += "<a title='Edit Page' href='"+options.editUrl.replace('#id', oData.id)+"'><i class='icon-edit2'></i></a>&nbsp;";
                            else if(oData.type==2 && (oData.flags&0x2||options.isAdmin))
                                html += "<a title='Replace File' action='"+options.updateFileUrl.replace('#id', oData.id)+"' class='update_file' href='javascript:void(0)' url='"+options.saveUrl.replace('#id', oData.id)+"'><i class='icon-arrow-repeat'></i></a>&nbsp;";
                        }
                        html += "</span>";
                        $(nTd).html(html);
                    }
                },
            ],
            rowReorder: {
                dataSrc: 'id',
            },
            "searchCols": [
                { "search": options.archiveId },
            ],
            drawCallback: function( settings, json ) {

                archiveDiv.find("#upload_files").attr('action', options.uploadFilesUrl.replace('#id', options.archiveId));
                archiveDiv.find("#import_archive").attr('action', options.importUrl.replace('#id', options.archiveId));
                archiveDiv.find(".upload_type_file").each(function() {
                    var action = options.uploadFilesUrl.replace('#id', options.archiveId)+"?content_type="+$(this).attr('content_type');
                    $(this).attr('action', action);
                });

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

                    archiveDiv.find(".update_file").uploadFiles({
                            token: options.token,
                            progressBar: archiveDiv.find('#progress_bar'),
                            progressText: archiveDiv.find('#progress_text'),
                        },
                        function(data) {
                            infoBox('File replaced successfully.', function(){
                                table.ajax.reload( null, false );
                            });
                        });

                    archiveDiv.find('.mark_archive').on('click', function (event) {
                        event.preventDefault();
                        var data = table.row($(this).closest('tr')).data();
                        var index = markedIds.indexOf(data.id);
                        if(index<0) {
                            markedIds.push(data.id);
                            $(this).find('i').attr('class', 'icon-checkmark');
                        } else {
                            markedIds.splice(index, 1);
                            $(this).find('i').attr('class', 'icon-checkmark2');
                        }
                        if(markedIds.length>0) {
                            $('#archive_marks').show();
                            $('#archive_marks').text(markedIds.length+" items")
                            $('#archive_move').show();
                            $('#archive_paste').show();
                            $('#reset_marks').show();
                            $('#marks_divider').show();
                        } else {
                            resetMarks();
                        }
                    });

                    archiveDiv.find('.edit_archive_info').on('click', function (event) {
                        event.preventDefault();

                        var id = $(this).closest('tr').attr('id');
                        var url = options.saveUrl.replace('#id', id);
                        var checkShortNameUrl = options.checkShortNameUrl.replace('#id', id);
                        var row = table.row("tr[id="+id+"]");
                        var data = row.data();
                        var title = data.title;

                        var modal = $('#edit_folder_modal').first();
                        modal.find('.modal-title').text('Edit Archive');
                        modal.find('form').attr('action', url);
                        modal.find("form :input[name='type']").val(data.type);
                        modal.find("form :input[name='title']").val(data.title);
                        modal.find("form :input[name='sub_title']").val(data.sub_title);
                        modal.find("form :input[name='description']").val(data.description);
                        modal.find("form :input[name='content_type']").val(data.content_type);
                        modal.find("form :input[name='short_name']").val(data.short_name);
                        modal.find("form :input[name='parent_id']").val(data.parent_id);
                        /*
                        for (i=0;i<data.users.length;i++){
                            modal.find("form :input[name='users_ids'] option[value="+data.users[i].user_id+"]").attr('selected', 'selected');
                        }
                        modal.find("form :input[name='roles']").val();
                        */
                        modal.find("form :input[name='visible']").prop("checked", (data.flags&0x1)?true:false);
                        modal.find("form :input[name='writable']").prop("checked", (data.flags&0x2)?true:false);
                        modal.find("form :input[name='short_name']").attr('data-remote', checkShortNameUrl);

                        modal.execModal({}, function(response){
                            table.ajax.reload( null, false );
                        },function(response){
                            var errorString = '';
                            $.each( response.errors, function( key, value) {
                                errorString += value;
                            });
                            errorBox(errorString);
                        },function (modal) {
                            $.each(data.users, function( index, value ) {
                                modal.find("#users_ids").prepend("<option value="+value.id+" selected>"+value.name+" ("+value.code+")"+"</option>");
                            });

                            $.each(data.roles, function( index, value ) {
                                modal.find("#roles").prepend("<option value="+value.id+" selected>"+value.name+"</option>");
                            });

                            modal.find('#users_ids').initializeSelectize();
                            modal.find('#roles').selectize({
                                plugins: ['remove_button'],
                            });
                        });
                    });

                    archiveDiv.find('.delete_archive').on('click', function (event) {
                        event.preventDefault();

                        var row = $(this).closest('tr');
                        var data = table.row(row).data();
                        var url = options.deleteUrl.replace('#id', data.id);

                        function deleteArchive(url, silent) {
                            $.post(url,  {"_token": options.token}, function(response){
                                row.remove();
                                table.ajax.reload( null, false );
                                if(!silent)infoBox("Item deleted successfully.");
                            }).fail(function(response) {
                                if(!silent)showRepsonseErrors(response);
                            });
                        }

                        if(silent) {
                            deleteArchive(url, true);
                        } else {
                            warningBox("Are you sure you want to delete this item (<b>"+data.title+"</b>) ?", function() {
                                deleteArchive(url, false);
                            });
                        }

                    });

                    if(newItemAdded) {
                        newItemAdded = false;
                        table.page('last').draw('page');
                    }
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


        table.on( 'row-reorder', function ( e, diff, edit ) {

            var id = diff[0].oldData;
            var neighbour_id = diff[0].newData;
            var position = (diff[0].newPosition < diff[0].oldPosition)? 'before' : 'after';
            var url = `/archive/order/${id}/${position}/${neighbour_id}`;
            $.ajax({
                type: 'get',
                url: url,
                success: function (data) {
                    console.log(data);
                    table.draw();
                }
            });
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

        archiveDiv.find('#text_search').on('keyup', function (e){
            if(e.keyCode == 13)
                archiveDiv.find('#search_button').trigger('click');
        });

        archiveDiv.find('#reset_button').on('click', function () {
            archiveDiv.find("#text_search").val("")
            archiveDiv.find("#type").val("");
            archiveDiv.find("#content_type").val("");
            archiveDiv.find("#search_type").val("");
            archiveDiv.find('#search_button').trigger('click');
        });

        archiveDiv.find('#export_archive').on('click', function (e){
            if(options.archiveId!=0) {
                window.location.href = options.exportUrl.replace('#id', options.archiveId);
            }
        });

        archiveDiv.find('#download_files').on('click', function (e){
            if(options.archiveId!=0) {
                window.location.href = options.downloadFiles.replace('#id', options.archiveId);
            }
        });

        archiveDiv.find('#download_all').on('click', function (e){
            if(options.archiveId!=0) {
                window.location.href = options.downloadAll.replace('#id', options.archiveId);
            }
        });

        archiveDiv.find("#import_archive").uploadFiles({
                token: options.token,
                progressBar: archiveDiv.find('#progress_bar'),
                progressText: archiveDiv.find('#progress_text'),
            },
            function(data) {
                archiveDiv.find('#reset_button').trigger('click');
            }, function(response){
                showRepsonseErrors(response);
            });

        archiveDiv.find('#archive_paste').on('click', function (e){

            var url = options.pasteToUrl.replace('#id', options.archiveId);
            $.post(url, { "_token": options.token, "marked_ids": markedIds}, function(data, status) {
                infoBox('Item paste successfully.', function(){
                    resetMarks();
                    table.draw(false);
                });
            }, 'json').fail(function(){errorBox("Operation failed.");});
        });

        archiveDiv.find('#reset_marks').on('click', function (e){
            e.preventDefault();
            resetMarks();
            table.draw(false);
        });

        archiveDiv.find('#archive_move').on('click', function (e){
            confirmBox('Are you sure you want to move marked item to this folder. Please confirm', function() {
                var url = options.moveToUrl.replace('#id', options.archiveId);
                $.post(url, { "_token": options.token, "marked_ids": markedIds}, function(data, status) {
                    infoBox('Item moved successfully.', function(){
                        resetMarks();
                        table.draw(false);
                    });
                }, 'json').fail(function(){errorBox("Operation failed.");});
            });
        });
    }
}( jQuery ));
