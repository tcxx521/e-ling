define("eling/component/ui/editgrid/1.0.0/dist/editgrid",["gallery/handlebars/2.0.0/handlebars-seajs","eling/component/ui/grid/1.0.0/dist/grid","jquery/jquery-plugins/pagination/pagination","eling/component/core/uicomponent/2.0.0/src/uicomponent","base","tools","handlebars","templatable","bootstrap","eling/component/utils/ajaxwrapper","dialog","store","eling/component/utils/gridformat/gridformat","./editgrid.tpl","eling/component/utils/tools/tools"],function(a,b,c){var d=a("gallery/handlebars/2.0.0/handlebars-seajs"),e=a("eling/component/ui/grid/1.0.0/dist/grid"),f=a("eling/component/utils/gridformat/gridformat"),g=a("./editgrid.tpl"),h=a("eling/component/utils/tools/tools");d.registerHelper("editgrid",function(a,b){for(var c=a.data||[],d=a.columns||[],e=a.newIndex||0,g="",h=0;h<c.length;h++){var i=f.getValue(a.idAttribute,c[h]);g+="<tr data-index='"+e+"' data-idAttribute='"+i+"'>",a.isCheckbox&&(g+="<td><input class='J-checked J-grid-checkbox' type='checkbox'></td>"),a.isRadiobox&&(g+="<td><input class='J-checked J-grid-radiobox' type='radio'></td>");for(var j=0;j<d.length;j++){var k=d[j].key||"",l=k.replace(".","-"),m=c[h]||"";m&&(m=f.getValue(k,c[h])),g+="<td class='J-grid-td-"+l+" "+(d[j].className||"")+"'>",g+="<pre>";var n=d[j].format,o="";"function"==typeof n&&(o=c[h]?n(m,c[h]):""),g+=f[n]||f[o]?f[n]?f[n](d[j].formatparams,m,c[h],a):f[o](d[j].formatparams,m,c[h],a):"function"==typeof n?n(m,c[h])||"":"text"==d[j].type?"<input class='form-control J-grid-td-input-"+l+"' type='text' value='"+(o||m)+"'>":o||m,g+="</pre>",g+="</td>"}g+="</tr>",e++}return g});var i=e.extend({attrs:{template:g,isInitPageBar:!1,data:[]},addRow:function(a,b){var c=this.get("model"),e=0!=this.$("tbody tr").size()?parseInt(this.$("tbody tr").last().attr("data-index"))+1:0,f=d.compile("{{#editgrid this}}{{/editgrid}}")({columns:c.columns,idAttribute:c.idAttribute,data:a||new Array(1),newIndex:e});this.$("tbody").append(f),b&&b()},getRow:function(a){return a?this.$("tbody tr[data-index='"+a+"']"):this.$("tbody tr")},delRow:function(a){this.getRow(a).remove()},editRow:function(a,b){var c=this.getRow(a);if(b)for(var d=0;d<b.length;d++)c.find("input").eq(b[d]).removeAttr("disabled").removeClass("disabledrow");else c.find("input").removeAttr("disabled").removeClass("disabledrow")},disabledRow:function(a,b){var c=this.getRow(a);c.each(function(a,c){if(b)for(var d=0;d<b.length;d++)$(c).find("input").eq(b[d]).attr("disabled","disabled").addClass("disabledrow");else $(c).find("input").attr("disabled","disabled").addClass("disabledrow")})},getEditData:function(){var a=this.get("model").columns,b=[];return this.element.find("tbody tr").each(function(c,d){var e={};$(d).find("td").each(function(b,c){var d=$(c).find(".J-grid-td-input-"+a[b].key.replace(".","-")).val();e[a[b].key]=d}),b.push(e)}),b},getColumnsData:function(a){for(var b=[],c=this.get("model")||{},d=c.data||[],e=0;e<d.length;e++){var f=h._getValueWithPoint(a,d[e]);b.push(f)}return b},getIDAttribute:function(a){return this.$("tbody tr").eq(a).attr("data-idAttribute")}});c.exports=i}),define("eling/component/ui/editgrid/1.0.0/dist/editgrid.tpl",[],"<div class='container el-grid'>\n	<div class='row'>\n		<div class='col-xs-12'>\n			<div class='row'>\n				<div class='col-sm-12'>\n					<div class='box' style='margin-bottom:0;'>\n						{{#if this.head}}\n							<div class='box-header'>\n								<div class='title J-grid-title'>{{this.head.title}}</div>\n								<div class='actions'>\n									{{#each this.head.buttons}}\n									<div class=\"J-grid-head-{{this.id}} btn btn-theme\">\n										<i class=\"{{this.icon}}\"></i>\n									</div>\n									{{/each}}\n									{{#if this.head.input}}\n										<input class=\"J-grid-title-input-{{this.id}} form-control margin_top_3\" type=\"text\" style=\"width: 80%;display: inline;\">\n									{{/if}}\n								</div>\n							</div>\n						{{/if}}\n						<div class='box-content box-no-padding'>\n							<table style='border:0 none;margin-bottom:0;' class='data-table-column-filter table table-bordered table-striped'>\n								<thead>\n    								<tr>\n   									{{#if this.isCheckbox}}\n   										<th style='border-bottom-width:0;width: 5%;'><input class='J-grid-all-checkbox' type='checkbox'></th>\n   									{{/if}}\n   									{{#if this.isRadiobox}}\n   										<th style='border-bottom-width:0;width: 5%;'></th>\n   									{{/if}}\n    								{{#each this.columns}}\n    									<th style='border-bottom-width:0;' class=\"col-md-{{this.col}}\">{{this.name}}</th>\n    								{{/each}}\n   								</tr>\n 								</thead>\n								<tbody class=\"J-grid-table\">\n    								{{#editgrid this}}\n    								{{/editgrid}}\n                				</tbody>\n                				<tfoot class=\"J-grid-footer\">\n               						{{#if this.isInitPageBar}}\n	                					<tr class=\"pagination\" style=\"display: table-row !important;\">\n                							<th colspan='{{this.length}}' style=\"border-bottom: 0;\">\n                								<div class=\"J-pagination\" style=\"float: right;\"></div>\n                							</th>\n	                					</tr>\n	                				{{/if}}\n                				</tfoot>\n                			</table>\n		                </div>\n		            </div>\n		        </div>\n		    </div>\n		</div>\n	</div>\n</div>");