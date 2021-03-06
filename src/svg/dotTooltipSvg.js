// KoGor’s Block http://bl.ocks.org/KoGor/5994804
export default () => {
    /*eslint no-console: 0 */
    const _ = { mouseXY: [0,0], visible: false }
    const dotTooltip = d3.select('body').append('div').attr('class', 'ej-dot-tooltip');

    function show(data, tooltip) {
        const props = data.properties;
        const title = Object.keys(props).map(k => k+': '+props[k]).join('<br/>');
        return tooltip.html(title)
    }

    function create() {
        const _this = this;
        this.dotsSvg.$dots()
        .on('mouseover', function() {
            if (_this._.options.showBarTooltip) {
                _.visible = true;
                _.mouseXY = [d3.event.pageX + 7, d3.event.pageY - 15];
                const i = +this.dataset.index;
                const data = _this.dotsSvg.data().features[i];
                (_.me.show || show)(data, dotTooltip)
                .style('display', 'block')
                .style('opacity', 1);
                refresh();
            }
        })
        .on('mouseout', function() {
            _.visible = false;
            dotTooltip.style('opacity', 0)
            .style('display', 'none');
        })
        .on('mousemove', function() {
            if (_this._.options.showBarTooltip) {
                _.mouseXY = [d3.event.pageX + 7, d3.event.pageY - 15];
                refresh();
            }
        });
    }

    function refresh() {
        dotTooltip
        .style('left', _.mouseXY[0] + 7 + 'px')
        .style('top', _.mouseXY[1] - 15 + 'px');
    }

    function resize() {
        create.call(this);
        dotTooltip.style('opacity', 0)
        .style('display', 'none');
    }

    return {
        name: 'dotTooltipSvg',
        onInit(me) {
            _.me = me;
            this._.options.showBarTooltip = true;
        },
        onCreate() {
            create.call(this);
        },
        onRefresh() {
            refresh.call(this);
        },
        onResize() {
            resize.call(this);
        },
        visible() {
            return _.visible;
        }
    }
}
