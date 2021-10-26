<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Task</title>

    <script src="/js/jquery.js"></script>
    <script type="text/javascript" src="/vendor/jquery-ui/jquery-ui.js"></script>

    <!-- Common CSS -->
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/fonts/icomoon/icomoon.css" />
    @if( Lang::locale() == 'ar' )
        <link rel="stylesheet" href="/css/main-rtl.css" />
    @else
        <link rel="stylesheet" href="/css/main.css" />
    @endif

    <!-- upload files -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/jquery.fileuploader.css') }}" media="all">

    <!-- Datatable CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/jquery.dataTables.min.css') }}" >
    <link rel="stylesheet" type="text/css" href="{{ asset('css/responsive.dataTables.min.css') }}" >
    <link rel="stylesheet" type="text/css" href="{{ asset('css/rowReorder.dataTables.min.css') }}" >
 
    <link rel="stylesheet" type="text/css" href="{{ asset('dist/picker.css') }}" >



    <link rel="stylesheet" href="{{ asset('css/dynamic-table.jquery.css') }}" type="text/css">

    <!-- Chosen Select CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/chosen.css') }}">

    <!-- Selectize CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/selectize.css') }}">

    <!-- Summernote CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/summernote/summernote.css') }}">

    <!-- Faculty CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/faculty.css?1') }}">

    <link rel="stylesheet" type="text/css" href="{{ asset('css/factory.css') }}">

    {{--  Excel Sheet  --}}
    <link rel="stylesheet" media="screen" href="{{ asset('css/handsontable.full.min.css') }}">

</head>