import chalk from 'chalk';
import user from "./user.js";
import articles from './articles.js';

function permissionChecks(article, permFuncs) {
    console.log(`Permissions for Article '${article.title}':`);
    permFuncs.forEach((permFunc) => {
        const result = permFunc();
        if(result) {
            console.log(`   ${permFunc.toString()}: ${chalk.bold.cyanBright(result)}`);
        } else {
            console.log(`   ${permFunc.toString()}: ${chalk.bold.red(result)}`);
        }
    });
}

articles.forEach((article) => {
    permissionChecks(article, [() => user.id == article.author_id]);
    console.log('\n');
});
