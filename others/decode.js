function decode(data)
{
    try
    {
        var node = parseXml(data).documentElement;

        if (node != null && node.nodeName == 'mxfile')
        {
            var diagrams = node.getElementsByTagName('diagram');

            if (diagrams.length > 0)
            {
                data = getTextContent(diagrams[0]);
            }
        }
    }
    catch (e)
    {
        // ignore
    }

        try
        {
            data = atob(data);
        }
        catch (e)
        {
            console.log(e);
            alert('atob failed: ' + e);

            return;
        }


        try
        {
            data = bytesToString(pako.inflateRaw(data));
        }
        catch (e)
        {
            console.log(e);
            alert('inflateRaw failed: ' + e);

            return;
        }

        try
        {
            data = decodeURIComponent(data);
        }
        catch (e)
        {
            console.log(e);
            return;
        }
    }

	if (data.length > 0)
	{
    	return data;
    }
};


function parseXml(xml)
{
    if (window.DOMParser)
    {
        var parser = new DOMParser();

        return parser.parseFromString(xml, 'text/xml');
    }
    else
    {
        var result = createXmlDocument();

        result.async = 'false';
        result.loadXML(xml);

        return result;
    }
};